---
title: Ranid Projects
layout: default
---

<style>
  .projects {
    display: flex;
    flex-direction: column;
  }

  .project {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .projectText {
    padding: 30px;
  }

  img {
    width: 20rem;
    margin: 2rem;
  }

  @media screen and (max-device-width: 1000px) {
    .project {
      align-items: flex-start;
    }

    img {
      width: 10rem;
    }
  }
</style>

{% assign projects = site.projects | sort: "order" %}
{% for project in projects reversed %}
  {% assign loopindex = forloop.index | modulo: 2 %}
  <div class="project">
    {% if loopindex == 1 %}
      <div class="projectText">
        <a href="{{ project.link }}">
          <h2>{{ project.title }}</h2>
        </a>
        {{ project.content }}
      </div>
      <img src="images/{{ project.image }}" alt="{{ project.imagealt }}" />
    {% else %}
      <img src="images/{{ project.image }}" alt="{{ project.imagealt }}" />
      <div class="projectText">
        <a href="{{ project.link }}">
          <h2>{{ project.title }}</h2>
        </a>
        {{ project.content }}
      </div>
    {% endif %}
  </div>
{% endfor %}
