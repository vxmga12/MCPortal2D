# MCPortal2D
A small custom project/a web app that validates whether a Minecraft portal is setup properly or not. Mostly made to develop my programming ability. Don't take it too seriously tho.

# Zoom explanation

If wrapper is 20%+ then the dimensions are {2304, 1142} 

Divide screen into half for both coordinates x and y
-> 1920/2=960 for x | 952/2=476

Get percentage of mouse coordination where the origin starts from the middle of the screen for both coordinates x and y.
->(If mouse is all the way to the left side and in the origin coordinate of y then)
0-960=-960 | 476-476=0

-960/960 = -1 ou -100% for the x coordinate | 0/476= 0 ou 0% for the y coordinate

Get the dimensions according to the percentage of the position of the mouse.
->For the screen is -960 | 0
Mapped to the wrapper would be:

-1 * 2304 = -2304 | 0 * 1142 = 0

--2304 = 2304 | -0 = 0
translate the previous numbers