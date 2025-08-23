-- Fix security vulnerability: Restrict consultation_requests read access to admin users only

-- Drop the insecure public read access policy
DROP POLICY IF EXISTS "Admin can view consultation requests" ON public.consultation_requests;

-- Create secure policy that restricts read access to authenticated admin users only
CREATE POLICY "Authenticated admins only can view consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin management policy for consultation requests
CREATE POLICY "Authenticated admins can manage consultation requests"
ON public.consultation_requests
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated admins can delete consultation requests"
ON public.consultation_requests
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));