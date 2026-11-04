"""Encode rendered UI frames, using a fixed palette to prevent GIF shimmer.

Requires Pillow. Run render-glow.cjs first. No bitmap artwork is edited here.
"""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
for name in ('toolkit', 'about-oscar', 'github-link', 'email-link'):
    paths=sorted((ROOT/'.glow-frames'/name).glob('*.png'))
    # Share a palette across the entire loop so static lettering stays still.
    samples=[Image.open(paths[i]).convert('RGB') for i in (0,18,36,54)]
    sw,sh=samples[0].size
    atlas=Image.new('RGB',(sw,sh*len(samples)))
    for i,frame in enumerate(samples):
        atlas.paste(frame,(0,i*sh))
    palette=atlas.quantize(colors=160,method=Image.Quantize.MEDIANCUT)
    frames=[]
    for p in paths:
        with Image.open(p) as frame:
            frames.append(frame.convert('RGB').quantize(palette=palette,dither=Image.Dither.NONE))
    frames[0].save(ROOT/'assets'/f'{name}.gif',save_all=True,
        append_images=frames[1:],duration=[80,80,90]*24,
        loop=0,disposal=1,optimize=True)
    print(name, len(frames), 'frames;', (ROOT/'assets'/f'{name}.gif').stat().st_size,'bytes')
