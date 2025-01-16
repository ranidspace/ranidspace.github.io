---
title: Ranid Friends
layout: default
---
<head>
  <link rel="stylesheet" href="friendassets/friends.css">
</head>
{% assign friends = site.friends | sort: 'order' %}
{% for friend in friends %}
  <div class = "{{ friend.title | downcase }} friend">
    <h1>{{ friend.name }}</h1>
    {{ friend.content }}
    <p><a href="{{ friend.link }}">visit here</a></p>
  </div>
{% endfor %}
