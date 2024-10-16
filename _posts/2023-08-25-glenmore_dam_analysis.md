---
layout: post
title: Glenmore Dam Vibration Analysis
date: 2023-08-25 21:01:00
description: Analyzed the raspberry shake data from Glenmore Dam
tags: vibrations RS3D dams ERT
categories: signal-processing
thumbnail: assets/html/glenmoredam_20230825/MEM-Vertical.png
published: true
---

Data acquisition was conducted at two locations: (i) from a public pathway above the dam crest approximately midway along the length of the overflow spillway, i.e., “Dam Crest”; and (ii) free field approximately 100 m downstream of the overflow spillway, i.e., “Free Field”. 

The RS 3D time series data exhibits significant low-frequency drift, both at the free field location and at the dam crest. For the dam crest, which was expected to exhibit vibrations due to release of water through the low-level outlet, the amplitudes of vibrations are relatively large, particularly in the instream and vertical directions. Furthermore, and more concerning, transient wave trains at the free field location appear to have different arrival times in each of the three directions, which indicates possible issues with the time synchronization between the channels of the single instrument.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/html/glenmore_dam20230825/TS-Free Field.html" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/html/glenmore_dam20230825/TS-Dam Crest.html" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example segment of velocity time series recorded by the Raspberry Shake instrument at the free field location (left) and the dam crest (right).
</div>

MEM-based power spectral density estimates were also examined for recordings at both the free field location and the dam crest. Spectral peaks apparent in certain directions of the dam crest response support the presence of multiple resonant frequencies. Attributing these resonances to specific component behavior is complicated by the multiple components which contribute to the response at this location, including the dam body, piers, and elevated arch bridge superstructure.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/html/glenmore_dam20230825/MEM-Free Field.html" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/html/glenmore_dam20230825/MEM-Dam Crest.html" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    Power spectral density estimates computed via the maximum entropy method for the velocity time series recorded by the Raspberry Shake instrument at the free field location (left) and the dam crest (right).
</div>

