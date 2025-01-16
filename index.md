---
title: Ranid Website
layout: default
---
<style>
  .info-flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.5em;
    margin: 5rem auto;
}

  .info-text {
    display: block;
    text-align: justify;
    padding: 0;
    max-width: 35rem;
  }

  .media-list {
    display: block;
    min-width: 18rem;
  }

  @media screen and (max-device-width: 1000px) {
    .info-flex {
      flex-direction: column;
      margin: 0;
    }

    .info-text {
      display: block;
      margin: auto;
      text-align: center;
      padding: 0;
      max-width: none;
    }

    .media-list {
      display: none;
    }
  }
</style>

<div class="info-flex">
  <div class="info-text">
    Hi, this is Audrey, but you may know me as Ranid or Ranidspace. I go by They/It/Xe pronouns. I am not a web
    designer (which may be apparent). Feel free to look around. This website is severely unfinished!
  </div>

  <div class="media-list">
    Find me here:
    <ul>
      <li>Youtube:
        <a href="https://www.youtube.com/@ranidspace">ranidspace</a></li>
      <li>Discord server:
        <a href="https://discord.com/invite/T2t9DVFhUc">T2t9DVFhUc</a></li>
    </ul>
  </div>

</div>

<h3> Blog </h3>

{% for post in site.posts %}
  <div class="blogpost">
    <h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
    <h5>{{ post.date | date: "%Y-%m-%d %l:%M%p" }}</h5>
    {{ post.content }}
  </div>
{% endfor %}
