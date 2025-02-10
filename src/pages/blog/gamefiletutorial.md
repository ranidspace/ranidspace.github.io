---
title: "How to rip your own Splatoon (or other Nintendo) game files"
date: 2025-01-20 17:22
layout: '@layouts/Blog.astro'
---

I have left all social media and I am still getting messages about people
wanting me to rip game file things and yes I am going to work on the drive and
have things updated now that they're not adding any more new content, but I also
want to share my knowledge on how to do this so here we go.

<!--more-->


## Getting the files

This is the scary bit but I believe in you.

#### Method 1: nxdumptool

If you have a switch running
[Atmosphère](https://github.com/Atmosphere-NX/Atmosphere) (Homebrew) this is
quite easy, grab the latest commit build of `nxdt_rw_poc.nro` from [the Github
releases page](https://github.com/DarkMatterCore/nxdumptool/releases) and put
that in the `switch/` directory of your SD card

I wrote a whole guide and everything but instead I'm just going to link to
[this one by Dardel](https://dardel.codeberg.page/nxdumpguide/), follow the
steps in "Dumping RomFS For Modding"

One thing to note, is that in the games I've tried, dumping the Update for the
game also dumped everything from the base game as well, so you may just be able
to skip that. Most games didn't have "DLC Updates" either, but I'd check just to
make sure.

The dump will create a lot of nested folders, `/NCA FS/User/Extracted/[Game
Info]/[Data or Program] #0/[Some Number]` but inside that numbered folder that
is the actual files you'd want.

#### Method 2: Using an NSP file.

You can also follow the guide in "Proceed to Dumping to PC", which will give you
an NSP file.

I believe switch toolbox can actually open up an NSP or an XCI file directly,
however it's a bit more convenient to dump the files.

You can load up the NSP into an
[emulator](https://www.androidauthority.com/nintendo-emulators-legal-3517187/).
The last builds of Yuzu and Ryujinx are archived around, and there are forks
going around. Make sure it's trustworthy, look around on Reddit, idfk.

I do prefer Ryujinx, but it can't dump DLCs. So Yuzu has to do. Once a game
is in Yuzu (don't start the game) right click on it, hit `Dump RomFS` (twice)
and when it's done it will show you where it extracted.

#### Notes

Here's the final dump of the Update for Splatoon 3 looks like.

![A list of folders, with names such as "Model", "Effect", "Mals", "Sound" and
"Layout"](/images/blog/gamefiles/romfsfolders.png)

You can also, instead of dumping romfs, dump exefs, which has the game code.
You'd have to decompile it to make sense of it though. Don't ask me how, I don't
know, it's very scary.

In both methods the dumped files are in odd locations, and you can move them
however you want, I would keep the DLC files in separate folders. Here's my file
structure

![A folder structure, Inside Splatoon 3 there is "base", "inkopolis", and "side
order", and inside side order there are the files from the previous
image](/images/blog/gamefiles/layout.png)

## Models and Textures

If you're going to be putting models into blender, I made a [Blender
add-on](https://github.com/ranidspace/BlenderBfresImporter) to import bfres
models directly. From there, you can export it to whichever format you like.

I still think it's a good idea to learn Switch Toolbox, it's good for a lot more
than just bfres files, and is more useful in a lot of ways.

Switch Toolbox is technically archived, however work is still being put into it
here and there, so I would [download the latest
build](https://github.com/KillzXGaming/Switch-Toolbox/releases/tag/Latest)
from the Github.

I have also made [my own fork](https://github.com/ranidspace/Switch-Toolbox)
which just has some small changes which I prefer, but also fixes for previewing
Splatoon 3 models. You will have to build it yourself. I wont go into that here,
but the regular Switch Toolbox works completely fine.

Once you have it open, you can just open the folder with the romfs, and browse
around.

I'll be talking about things from Splatoon here, but other games may have
similar structures.

#### Model Basics

Models are in the `Model` folder. Double click on anything to see it in the 3D
view.

![A screenshot of Switch Toolbox, The highlighted item on the left is
NPC_Knickknacks, and in the viewport, harmony from Splatoon is there. There's a
lot of visual noise and some things are the wrong
colour](/images/blog/gamefiles/before.png)

The yellow octahedrons are animations bones. You can make them smaller or turn
them off in Settings -> Main Settings -> Display Bones. You can also see that
parts of her are just completely black, and this can be fixed in the same
settings menu by turning off "Display Vertex Colors," but other models may need
it to look proper.

![The same screenshot, with the issues mentioned
fixed](/images/blog/gamefiles/after.png)

#### Texture Basics

Every model has a textures folder, and you can view them in a big viewer but
clicking the little 3D button at the top, otherwise it goes into a small preview
in the bottom right

![A screenshot showing a full view of a normal map
texture](/images/blog/gamefiles/channelswapon.png)

If you've dealt with normal maps before this may look odd, as normal maps are
usually a blue colour. You may also notice that some other textures like
roughness or ambient occlusion textures are transparent when they shouldn't be.
This can be fixed by turning off `View -> Use Component Selector`

![A similar screenshot, showing the menu to turn off the option. The normal map
now is blue](/images/blog/gamefiles/channelswapoff.png)

Some games will need this option ON however, just check to see which one looks
like it makes more sense.

#### Exporting

And now for the moment you've all been waiting for, if you open the "Models"
folder, you can click Export, and it will save the model as a DAE.

![A screenshot with a context menu over a file in the Models folder of the
model, highlighting "Export"](/images/blog/gamefiles/exportmodels.png)

This will also export the included textures, though I would actually recommend
against exporting the textures like this. When exporting the model, turn off
"Export textures." Afterwards, right click on the "Textures" folder, and click
"Export All Textures."

![A screenshot with a context menu over the Textures folder, highlighting
"Export All Textures"](/images/blog/gamefiles/exporttextures.png)

This will avoid textures with the same name from other
models being included instead, as well as including all the unused textures
(some models have variants of textures for things like eyes, it will only export
the first one otherwise).

If the textures worked better with the "Component Selector" off, disable the
"Use Texture Channel Swaps" option.

![The options for exporting a texture. "Use Texture Channel Swaps" is
unchecked](/images/blog/gamefiles/textureoptions.png)

If possible, I would suggest using `Microsoft DDS (.dds)` textures as the "bntx"
format that the textures are originally in use the exact same compression
methods so you get the smallest size with no loss in quality. Otherwise png is
good and more easily usable.

#### Batch Model Extraction

There can be multiple models inside of each "Model." You can export all at once
using `Tools -> Batch Export Models`. You can do this for as many different
files at a time. Once again I would recommend turning off texture exporting, and
doing it separately, with `Tools -> Batch Export Textures (All Supported
Formats)`. This also is much faster for some reason.

#### Using the models

If the .dae and the textures are in the same folder, you should be able to open
it in any software that supports it. I would recommend converting it to an FBX
first. Blender for instance has a much better FBX importer, while the DAE
importer is in the process of being removed. The creator of FBX has [their own
converter](https://aps.autodesk.com/developer/overview/fbx-converter-archives)
but no libraries or any sort of open documentation for it so this is
what we get instead of being able to directly export to it, lovely.

#### Other stuff here

Anything UI related is either in the "Layout" or "UI" folders. Layout archives
contain all the info about what textures go where on the screen, how things are
"laid out." The support for Splatoon 3 layout files aren't too great, I think
the developer is working on a Layout Library, so check up on that once in a
while.

Particles are in the "Effect" folder, however toolbox will not work if you try
to open them. The file is compressed, so you can use Tools -> Compression ->
ZSTD -> Decompress, or just open it in 7zip and decompress it with that. Once
you have that you can open it in a hex editor, find "VFXB" and delete everything
that comes before it. Save the file, rename the extension to .ptcl, and Toolbox
should be able to open it. It's crude but what can you do.

## Text

The text is in the "Mals" folder, anything from dialogue to UI text, it should
all be in there. For Splatoon 3 they are in "sarc" files, but those can be
opened with switch toolbox. Inside you'll see a lot of "msbt" files, and while
switch toolbox can open them, other tools do the job better, such as [MSBT
Editor](https://gitlab.com/AeonSake/msbt-editor/-/releases). You'll probably
have to export the files first.

I've not personally used it, as for Splatoon 3, [LeanYoshi dumps all the text
out every
update](https://github.com/Leanny/splat3/blob/main/data/language/USen_full_unicode.json),
along with a lot of other neat stuff, if you go looking around that Github.

## Sound Effects and Music

You're gonna need [foobar2000](https://www.foobar2000.org/) along with the
[vgmstream component for it](https://vgmstream.org/).

After you install that, you should just be able to play anything in
`Sound/Resource/Stream` folder. For Splatoon 3 this has all the music, and a
couple ambient sound effects. The rest of the sound effects are in the
"Resource" folder, all as .bars.zs files. BARS files are packs of bfwavs, so you
can use a tool like [BARSReaderGUI](https://github.com/natv1337/BARSReaderGUI)
to extract them all into folders.

Some things will cause it to crash, usually if something inside of the BARS file
is also in the "Stream" folder, it will set the length of the file to -1 and the
program doesn't know how to handle that. I [forked
it](https://github.com/ranidspace/BARSReaderGUI) to deal with this properly,
when batch extracting, just exporting an empty file if it encounters it, but
once again, you have to build it yourself.

## Conclusion

Ripping models yourself is a really good skill to know, Switch Toolbox tells you
a LOT about the model that you can't just get from a ripped model. What colours
certain things are, exactly what values certain things have, etc.

There's a lot of demand for ripped assets and like barely a handful of people
who are doing it, I just think this could help out a bunch for everyone if even
a few more people started doing it.

The only reason I started splatoongamefiles was just because I noticed nobody
else did it, and I found it fun. It's a bit of a challenge to learn everything
about ripping models and stuff. Everything about switch toolbox and how
everything works was just from fiddling around and reading things online, you
don't have to code anything at all really.

It's cool and I would recommend trying it out.

If there's anything which you need more help with send me an ask on Tumblr and
I'll eventually see it and update this guide to be a bit clearer.
