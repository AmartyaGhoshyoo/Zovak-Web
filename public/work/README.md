# Work images

Drop project screenshots here, e.g.:

    orbit.jpg
    ledger.jpg
    nimbus.jpg
    sable.jpg
    fernweg.jpg
    pulse.jpg

Then reference them in `src/data/work.ts` by adding an `image` field to the
matching entry:

    {
      name: "Orbit",
      ...
      image: "/work/orbit.jpg",
    }

Once `image` is set, that project's card automatically switches from the
gradient placeholder to your real screenshot, with the same hover zoom and
overlay effects. Recommended size: at least 1200×900px, landscape, since the
card crops to a 4:3 frame.
