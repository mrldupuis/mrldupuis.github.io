---
layout: page
title: SDP
description: Structural Design Package
img: assets/img/sdp_icon.png
importance: 2
category: fun
published: true
---

# Structural Design Package (SDP) for Concrete Dam Components

**Developer**: Michael Dupuis  
**Organization**: Geosyntec Consultants Inc.  

The Structural Design Package (SDP) is a free educational tool designed to simplify the design and analysis of concrete dam structures. It’s geared towards students and professionals who want to explore structural calculations for components like slabs, beams, and walls, commonly needed in dam projects.

---

## Why SDP?

Creating detailed design reports for dam structures is often tedious and repetitive. Many commercial tools offer limited flexibility, can be pricey, and lack easy options for prototyping. SDP addresses these challenges by offering two ways to interact with the tool:
- **GUI (Graphical User Interface)**: Accessible to users without programming experience.
- **API (Application Programming Interface)**: Allows advanced users to script custom workflows in Python.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/sdp_gui.PNG" title="SDP Graphical user Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    SDP Graphical user Interface
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/sdp_api.PNG" title="SDP Application Programming Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    SDP Application Programming Interface
</div>

## How It Works

SDP uses Python (with wxPython for GUI) and LaTeX to automate the design package creation, which includes:
- **Project management**: Organizes structural elements within a single report.
- **Component library**: Supports various concrete elements (e.g., beams, slabs).
- **Automated calculations**: Runs capacity checks and code compliance evaluations based on design inputs.

The application compiles design information into a ready-to-review PDF report, which can be generated with a few clicks.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/beam_component_diagram.PNG" title="Beam component diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Beam component diagram
</div>

## Key Features

- **Free and Open Source**: Made for educational purposes, SDP is free to download and use.
- **Flexible Design Workflow**: Build projects through GUI or custom Python scripts.
- **Accurate Reporting**: PDF reports with visual summaries and calculation details.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/beam_component_properties.PNG" title="Property summary" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Property summary
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/beam_component_capacities.PNG" title="Capacity checks" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Capacity checks
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDP/beam_component_clauses.PNG" title="Code clause checks" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Code clause checks
</div>


## Future Plans

Future versions aim to add:
- More structural components (e.g., columns)
- New materials like steel and timber
- Expanded design standards (e.g., ACI318-19, CSA A23.3)

SDP is available for educational use, so feel free to try it out and provide feedback to help shape future releases!

---

### Resources

- [American Concrete Institute](https://www.concrete.org)
- [Download LaTeX](https://miktex.org)

For more details, check out the full documentation or contact us directly.



<!-- Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %} -->
