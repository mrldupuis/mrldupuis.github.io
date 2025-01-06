---
layout: page
title: SDP
description: Structural Design Package
img: assets/img/sdp_icon.png
importance: 2
category: software development
published: true
---

# Structural Design Package (SDP) for Concrete Dam Components

- [Overview Video Here](https://www.linkedin.com/posts/michael-dupuis-99539662_this-structural-design-software-tool-started-activity-7237577486723641344--6Tb?utm_source=share&utm_medium=member_desktop)
- [Download Software Here](https://github.com/mrldupuis/Structural-Design-Package)

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

- **Free and Educational**: Made for educational purposes, SDP is free to download and use.
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

- [Download LaTeX](https://miktex.org)

For more details, check out the full documentation or contact us directly.
