REVOKE ALL ON public.submissions FROM anon, authenticated;
GRANT ALL ON public.submissions TO service_role;

DROP POLICY IF EXISTS "Deny anon access to submissions" ON public.submissions;
DROP POLICY IF EXISTS "Deny authenticated access to submissions" ON public.submissions;

CREATE POLICY "Deny anon access to submissions"
  ON public.submissions
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny authenticated access to submissions"
  ON public.submissions
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);