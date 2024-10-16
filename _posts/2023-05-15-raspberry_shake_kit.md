---
layout: post
title: Raspberry Shake Field Kit
date: 2023-05-15 21:01:00
description: I purchased a low cost velocimeter and made a field kit
tags: vibrations RS3D
categories: instrumentation
thumbnail: assets/img/PXL_20230825_134627688.jpg
published: true
---

I've assembled a mobile testing kit using a [Raspberry Shake 3D](https://shop.raspberryshake.org/product/turnkey-iot-home-earth-monitor-rs-3d/) (RS 3D) velocimeter that I plan to use in the field. I hope to collect some interesting time series data with this to analyze.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_211352540.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The complete contents of the mobile testing kit I've assembled. The foam is compressible so the laptop (left) is able to fit in the kit is as well.
</div>

A dedicated laptop was required to connect to the RS 3D for controlling the device. Make sure to get a laptop with ethernet and USB ports so that you can connect to the shake and also transfer data files to other devices without an internet connection. I was able to get a used laptop from amazon for about $85 USD.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_211537340.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_212022602.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Small mboile laptop and ethernet cable for sending signals to the RS 3D to initiate and conclude data acquisition.
</div>

A portable power supply was also required to power both the laptop and RS 3D in the field. I was able to get one from amazon for about $100 USD.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_211504951.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_212009370.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Small portable power supply with cords to power both the laptop and RS 3D.
</div>

An optional GPS antenna can also be purchased to provide improved timing in the field. I don't recommend purchasing one of these, I have had issues with it and I have never been sure whether the RS 3D is using timing based off my laptop or from the GPS antenna. Maybe this is just user error on my part...

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_211513851.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/raspberry_shake/PXL_20241016_211517613.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Zoomed in photos of the RS 3D and antenna. Note that the orientation of the channels (North, East, and Vertical) for the RS 3D are only identified by a small arrow labelled as 'North' on the circuit board.
</div>
