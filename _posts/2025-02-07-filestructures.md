---
title: An incoherent rant about where programs store their files
date: 2025-02-07 10:36
layout: blog
---

\[I'm not proof-reading this I have strong emotions and a need to post]

I think if you wanna be productive you should keep things organized. I'm neither
productive nor organized however I do try to keep everything clean and the
thing that fucks with it the most is programs installing shit wherever they
want.

<!--more-->

On Windows, you're given a User folder, this contains your folders like
Desktop, Documents, Downloads, Pictures, Videos, Music, and a bunch of other
shit you wont ever touch, as well as the hidden folder AppData. My issue is with
the first two.

Everything in the Desktop folder is shown on the desktop, and so it's like a
visual launcher for different things if you want quick access to certain folders
and shortcuts. You would want this organized, but every fucking app wants to
just add their own shortcuts to the desktop. Many have the decency to ask you
during the install if you want to add a desktop icon, but many DO NOT!

Many people prefer it this way, and sure, I can see why, though I personally
launch everything from the Start Menu. But there's a much more egregious
example.

The Documents folder, is for Documents. It is a folder such as pictures, videos,
or music, where the user is meant to put their OWN THINGS into it. However every
fucking app has decided to store their data inside of the Documents folder
instead. So many video games store their save data (many not even having the
decency to use the "My Games" folder), for a quick example.

So where does application data go? IN THE APPDATA FOLDER!!!!

There's three main files in AppData, Roaming, Local, and LocalLow. Roaming is
meant to be taken with you or synced across computers so your data and settings
and save data and everything can be easily moved between computers. Local is
meant for things which are meant to stay "Local" to the computers, things like
temp files, or data which are provided by an install.

AppData differs from ProgramFiles because of permissions, to write outside of
the User folder you require administrator permissions (LocalLow just is Local
but given low levels of permissions btw). As a user you shouldn't ever have to
edit something outside of the User folder directly. This isn't really an issue
with anything, except for Steam, which on Linux, stores games in an user
accessible folder.

Linux in general is better about this. The Documents and Desktop folder aren't
even standard, and so they're entirely user controlled. Applications are
expected to put configuration files in `~/.config`, and any other user specific
data in `~/.local/share` where `.local` is locally installed programs, and share
means some shit like "architecture independent data". idk but it's there.
There's other folders like `~/.cache`, `~/.local/state`

Linux has a better system than Windows in this regard tbh but it does NOT stop
people from writing programs from storing shit in your HOME folder which I feel
like is worse than the documents folder. Fuckin, `~/.vscode`, `~/.librewolf`,
`~/.dropbox`, `~/.steam`, STOP!!!!

There's also a couple folders like `~/.java`, `~/.cargo`, `~/.npm` other package
manager type things and like, yeah sure maybe they can have their own folders
but I just feel like there should be a central folder for that because if you do
any sort of development, sometimes not even development just running things,
this clogs up your home folder FAST. In a file picker window my Desktop and
Documents don't even show up on the window I have to scroll down through all the
crap to get to it. Yes I can hide these all because they're .files, but I need
to access config and local often so it's not really a solution.

tl;dr programs store your shit in the proper folders that the computer fucking
made for it. If you touch my documents folder I'm gonna beat you up.
