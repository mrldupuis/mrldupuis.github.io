---
layout: post
title: Glenmore Dam Testing
date: 2023-07-12 21:01:00
description: Recorded vibration data from a large dam with the Raspberry Shake
tags: vibrations RS3D dams
categories: instrumentation
thumbnail: assets/img/PXL_20230825_140821473.jpg
published: true
---

I deployed the velocitmeter for approximately twenty minutes of data acquisition at two locations: (i) a public pathway above dam crest and (ii) at a free field approximately 100 m downstream of the dam. Data was collected on all three instrument channels for a duration of 20 minutes at each location during ambient operating conditions with approximately 1.5 cms of release through the low-level outlet (there is no power generation at Glenmore Dam). It was observed that the reservoir was at full pool and no irregular activities or events were noted which would have perturbed the ambient data collected at either location. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/PXL_20230825_140821473.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    View from downstream of the gated overflow spillway, piers, and supported walkway of the Glenmore Dam.
</div>

At each location, data collection with the RS velocimeter followed the following procedure:

1.	The portable power supply was turned on and connected to the field laptop which was also powered on.
2.	The RS-3D was connected to the laptop via ethernet cable.
3.	The RS-3D GPS antenna was connected to the RS-3D.
4.	The RS-3D was leveled using three leveling pins and a built-in bubble level and recording channels were oriented to be orthogonal to the axis of the dam (crossvalley; instream; and vertical)
5.	All wires were cleared from the perimeter of the device and a perimeter was delineated around the device.
6.	The RS-3D was plugged into the portable power supply.
7.	Data was collected during ambient operating conditions on all three recording channels.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/PXL_20230825_134425813.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/PXL_20230825_140818187.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Experimental setup of the Raspberry Shake 3D, portable power supply, laptop, and GPS antenna at Glenmore Dam: above the dam crest (left) and downstream free field (right).
</div>

I hope to analyze this data to see if I can pick up any harmonics (although their is no power generation) or structural resonances.
