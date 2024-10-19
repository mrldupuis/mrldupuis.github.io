---
layout: post
title: Raspberry Shake Verification
date: 2023-08-25 21:01:00
description: In-Office Verification Testing of a Raspberry Shake
tags: vibrations RS3D ERT
categories: signal-processing
thumbnail: assets/img/raspberry_shake/PXL_20241018_163926598.png
published: true
---

In this experiment, I was curious to see how the Raspberry Shake RS-3D would perform compared to the high-quality Sensequake Larze instruments. The Raspberry Shake is a much more affordable option for vibration monitoring, but I wanted to verify its accuracy and see if it could hold up in real-world conditions. To do this, I set it up in my office, where I could take my best shot at synchronizing the clocks of the two devices. I ran two 5-minute long tests comparing the Raspberry Shake, which can only record at 100Hz, with the Sensequake Larze recording at 100 Hz and then 1200 Hz.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241018_160813719.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241018_160843131.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Raspberry shake (left) and Sensequake Larze (right).
</div>

 By comparing the data collected with the trusted Sensequake Larze device, I hoped to get a clearer picture of the Raspberry Shakes' capabilities and limitations.

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out_unprocessed/TS-1-Raspberry Shake.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 0px dashed grey;"></iframe>
</div>
<div class="caption">
    As-recorded velocity time series from the Raspberry Shake (with instrument response removed).
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/TS-1-Raspberry Shake.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 0px dashed grey;"></iframe>
</div>
<div class="caption">
    Processed velocity time series from the Raspberry Shake (Tukey windowed, high-pass filtered with 4th order Butterworth filter at 2 Hz, and linearly detrended).
</div>

One thing that stood out early in the raw data was the large low-frequency drift, especially before any frequency filtering was applied. The raw time series, shown in the first figure, clearly needed some serious processing. To clean up the data, I used a high-pass Butterworth filter to get rid of the low-frequency drift.

Next, I wanted to compare the Raspberry Shake’s performance to the Sensequake Larze. Both instruments were set to record at 100 Hz, and when I compared the vertical velocity time series, there were some notable differences in amplitudes. The Fast Fourier Transform (FFT) comparison, shown in the next figure, indicates that the overall spectral shapes between the two instruments were pretty similar.


<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/TS-1-Vertical.html.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Comparison of the Raspberry Shake and Sensequake Larze vertical velocity time series sampled at 100 Hz.
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/FFT-1-Vertical.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Fast fourier spectra comparison of the Raspberry Shake and Sensequake Larze vertical velocity time series sampled at 100 Hz.
</div>

The Raspberry Shake did a decent job. The time series data, while not perfect, were reasonably accurate. However, there were clear issues, particularly with time synchronization between the different channels of the Raspberry Shake. This was evident from the transient wave trains arriving at slightly different times in each direction, which clearly shouldn't happen. To better illustrate the timing precision of the Raspberry Shake, a second 5-mintue long test was completed with the Sensequake Larze instrument recording at 1200 Hz, as shown in the figures below.

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/TS-2-Hor. 1.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Velocity time series for horizontal component 1 of the Raspberry Shake (100Hz) and the Sensequake Larze, recording at a high sampling rate of 1200 Hz.
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/TS-2-Hor. 2.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Velocity time series for horizontal component 2 of the Raspberry Shake (100Hz) and the Sensequake Larze, recording at a high sampling rate of 1200 Hz.
</div>

<div class="l-page">
    <iframe src="{{ '/assets/html/rs_verification/out/TS-2-Vertical.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>
<div class="caption">
    Velocity time series for the vertical component of the Raspberry Shake (100Hz) and the Sensequake Larze, recording at a high sampling rate of 1200 Hz.
</div>

Despite these problems, the Raspberry Shake’s FFT results were similar enough to the Larze to suggest that it could be useful for less demanding applications. It’s not quite ready to replace higher-end instruments like the Larze, but for its price, it still has potential.