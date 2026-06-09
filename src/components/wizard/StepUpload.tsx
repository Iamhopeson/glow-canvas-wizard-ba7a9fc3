import { motion, AnimatePresence } from "framer-motion";
import { FileImage, UploadCloud, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import type { WizardData } from "./Wizard";

export type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

const MAX_FILES = 10;
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export function StepUpload({
  data,
  update,
}: {
  data: WizardData;
  update: (p: Partial<WizardData>) => void;
}) {
  // Revoke any object URLs on unmount to prevent memory leaks.
  useEffect(() => {
    return () => {
      for (const f of data.files) {
        if (f.preview) URL.revokeObjectURL(f.preview);
      }
    };
    // Intentionally only run cleanup on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length) {
        toast.error(
          rejected.length === 1
            ? `${rejected[0].file.name} was rejected (over 8MB or unsupported).`
            : `${rejected.length} files rejected (over 8MB or unsupported).`,
        );
      }
      const next: UploadedFile[] = [...data.files];
      let skipped = 0;
      for (const f of accepted) {
        if (next.length >= MAX_FILES) {
          skipped++;
          continue;
        }
        if (f.size > MAX_SIZE) {
          skipped++;
          continue;
        }
        next.push({
          id: crypto.randomUUID(),
          file: f,
          preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
        });
      }
      if (skipped > 0) toast.message(`Limit reached — ${skipped} file(s) skipped.`);
      update({ files: next });
    },
    [data.files, update],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_SIZE,
  });

  const remove = (id: string) => {
    const target = data.files.find((f) => f.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    update({ files: data.files.filter((f) => f.id !== id) });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-display font-bold">Show me your taste.</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Drop in screenshots, style references, your logo — anything that helps me see your
          vision.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-white/15 bg-white/[0.03] hover:bg-white/[0.05]"
        }`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ y: isDragActive ? -4 : 0 }}
          className="mx-auto w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-3"
        >
          <UploadCloud className="w-6 h-6" />
        </motion.div>
        <div className="font-semibold">
          {isDragActive ? "Drop them here" : "Drag & drop, or click to browse"}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Images & PDFs · up to {MAX_FILES} files · 8MB each
        </div>
      </div>

      <AnimatePresence>
        {data.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {data.files.length} file{data.files.length === 1 ? "" : "s"}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {data.files.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass rounded-2xl p-2.5 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                    {f.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={f.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileImage className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">{f.file.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {(f.file.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button
                    onClick={() => remove(f.id)}
                    aria-label={`Remove ${f.file.name}`}
                    className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-destructive/20"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
