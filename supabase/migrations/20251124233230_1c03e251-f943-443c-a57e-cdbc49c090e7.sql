-- Create trials table to store each typing trial
CREATE TABLE public.trials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  typed_text text NOT NULL,
  target_text text NOT NULL,
  elapsed_time integer NOT NULL,
  wpm integer NOT NULL,
  accuracy integer NOT NULL,
  total_drag_distance integer NOT NULL,
  character_count integer NOT NULL,
  avg_time_per_char numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert trials (public app)
CREATE POLICY "Anyone can insert trials"
  ON public.trials
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to view trials (public app)
CREATE POLICY "Anyone can view trials"
  ON public.trials
  FOR SELECT
  USING (true);

-- Allow anyone to delete all trials (for reset functionality)
CREATE POLICY "Anyone can delete trials"
  ON public.trials
  FOR DELETE
  USING (true);