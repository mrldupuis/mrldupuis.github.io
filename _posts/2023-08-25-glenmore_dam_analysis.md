---
layout: post
title: Glenmore Dam Vibration Analysis
date: 2023-08-25 21:01:00
description: Analyzed the Raspberry Shake data from Glenmore Dam
tags: vibrations RS3D dams ERT
categories: signal-processing
thumbnail: assets/html/glenmoredam_20230825/MEM-Vertical.png
published: true
---

Data acquisition was conducted at two locations: (i) free field approximately 100 m downstream of the overflow spillway, i.e., “Free Field”; and (ii) from a public pathway above the dam crest approximately midway along the length of the overflow spillway, i.e., “Dam Crest”.

The RS-3D instrument records data in counts, which was converted to units of m/s while also [removing instrument response](https://github.com/mrdeqsim/remove_instrument_response). I also linearly detrended the velocity data and applied a Tukey window in the time domain.

The RS 3D time series data exhibits significant low-frequency drift, both at the free field location and at the dam crest. For the dam crest, which was expected to exhibit vibrations due to release of water through the low-level outlet, the amplitudes of vibrations are relatively large, particularly in the instream and vertical directions. Furthermore, and more concerning, transient wave trains at the free field location appear to have different arrival times in each of the three directions, which indicates possible issues with the time synchronization between the channels of the single instrument.


<div class="l-page">
    <iframe src="{{ '/assets/html/glenmoredam_20230825/TS-Free Field.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 0px dashed grey;"></iframe>
</div>
<div class="caption">
    Example segment of velocity time series at the free field location.
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/glenmoredam_20230825/TS-Dam Crest.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 0px dashed grey;"></iframe>
</div>
<div class="caption">
    Example segment of velocity time series at the dam crest.
</div>


MEM-based power spectral density estimates were also examined for recordings at both the free field location and the dam crest. Spectral peaks apparent in certain directions of the dam crest response support the presence of multiple resonant frequencies. Attributing these resonances to specific component behavior is complicated by the multiple components which contribute to the response at this location, including the dam body, piers, and elevated arch bridge superstructure.

<div class="l-page">
    <iframe src="{{ '/assets/html/glenmoredam_20230825/MEM-Free Field.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Power spectral density estimates computed via the maximum entropy method at the free field location.
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/glenmoredam_20230825/MEM-Dam Crest.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Power spectral density estimates computed via the maximum entropy method at the dam crest.
</div>

So far, based on my testing with the shake, its suitability for ambient vibration testing appears to be limited by its poor time control/synchronization, reliance on external power supply and dedicated laptop, and relatively low sampling rate of only 100 Hz (Nyquist frequency of only 50 Hz). I can't imagine trying to sync up multiple devices for sampling at multiple locations. However, it may still be a good option for certain applications due to its relatively low cost.