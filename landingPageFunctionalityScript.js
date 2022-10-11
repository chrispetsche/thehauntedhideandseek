// When the webpage opens up this function is called to set anything
// that needs to be done right at start.
function InitializeFunctionsAndInteractions()
{
    // Skills always start in the 'Art' skill type.
    SetSkillsTypeContent('art');
    // Set the timer for the cycling of the skills tables.
    Reset_CycleSkillsTable_Count();
}

// Variable to select content for html document.
var rootVariables = document.querySelector(':root');

// This function is called when the cycling of the skills table needs to know
// how many pages there are in a table for a specific type of skill.
function TotalNumberOfSkillPages(sType)
{
    // In this check the total number of pages is set for each table of skills.
    switch(sType) 
    {
        case "art":
            return 3;

          break;
          
        case "design":
            return 4;

          break;

        case "dev":
            return 5;

          break;

        default:
          alert("Something went wrong with setting TotalNumberOfSkillPages()!!");
      }
}

// ****************************** Site Timing ****************************** //

// Runs all timing of site.
var SiteOneSecondTimer = setInterval(function()
{
    // Call to increment skills timer count down.
    CycleSkillsTable_CountDown();
    
},1000);

// ****************************** Skills Section Timing ****************************** //

// Function to reset skills timer.
function Reset_CycleSkillsTable_Count()
{
    // Skills timer will be set to the value below.
    cycleSkillsTable_Count = 3;
}

// Timer to cycle skills tables.
function CycleSkillsTable_CountDown()
{
    // If the timer is greater than zero...
    if(cycleSkillsTable_Count > 0)
    {
        // Decrease the timer value by 1 second.
        cycleSkillsTable_Count--;
    }
    // But if the timer reaches zero...
    else if(cycleSkillsTable_Count <= 0)
    {
        if(TotalNumberOfSkillPages(skillType) > 1)
        {
            IncrementSkillsTablePageNumber('up');
        }
        // Call to cycle the skills table content.
        CycleSkillsTable();
        // And reset the timer so that the cycling repeats.
        Reset_CycleSkillsTable_Count();
    }
}

// ****************************** Skills Section: Select Skill Type Interactions ****************************** //

// 3 buttons are to select the type of skill the view may be interested in seeing.
// 1 for that sets the content to art.
$("#skills-art").click(function(){
    SetSkillsTypeContent("art");
});
// 1 for that sets the content to design.
$("#skills-design").click(function(){
    SetSkillsTypeContent("design");
});
// 1 for that sets the content to development.
$("#skills-development").click(function(){
    SetSkillsTypeContent("dev");
});

// Variable to set the type of skill to show viewer.
var skillType = "art";
// Variable for the page number to go with the skills that are associated with
// the type skills being viewed.
var skillPage = 1;

// When called, this function sets the type of skills that will be displayed in
// the skills table that will cycle on a timer and aligns the description to 
// the viewers selections that will not cycle.
function SetSkillsTypeContent(sType)
{
    // Setting the global variable for the type of skill being shown.
    skillType = sType;  
    // Resets the page back to the first page of the table so it always begins at
    // page 1 when the skill type is changed.
    skillPage = 1;
    // And the timer for cycling the skill table pages is reset so the viewer can
    // look through the first page for the full cycle time.
    Reset_CycleSkillsTable_Count();

    // This check sets the content being shown on screen based on the skill type
    // being passed into the function. It uses the skill type IDs to tap into the
    // css and turn off 2 of the types while turning the third on.
    switch(sType) 
    {
        case "art":

            $("#skills-art").css({
                "color" : "rgb(211, 2, 253)",
                "border" : "0.75px rgb(211, 2, 253) solid",
                "box-shadow" : "inset 0 0 7.5px rgb(211, 2, 253), 0 0 30px rgb(211, 2, 253)",
                "text-decoration" : "underline"
            });
        
            $("#skills-design, #skills-development").css({
                "border" : "0.5px rgb(72, 72, 255) solid",
                "color" : "rgb(83, 83, 253)",
                "text-decoration" : "none",
                "box-shadow" : "none"
            });

            // Swaps out the part of the title description that displays the skill type.
            document.getElementById("skills-desc-title").innerHTML = "art";
            
            //
            CycleSkillsTable();

          break;
          
        case "design":

            $("#skills-design").css({
                "color" : "rgb(211, 2, 253)",
                "border" : "0.75px rgb(211, 2, 253) solid",
                "box-shadow" : "inset 0 0 7.5px rgb(211, 2, 253), 0 0 30px rgb(211, 2, 253)",
                "text-decoration" : "underline"
            });
        
            $("#skills-art, #skills-development").css({
                "border" : "0.5px rgb(72, 72, 255) solid",
                "color" : "rgb(83, 83, 253)",
                "text-decoration" : "none",
                "box-shadow" : "none"
            });

            document.getElementById("skills-desc-title").innerHTML = "design";
              
            CycleSkillsTable();

          break;

        case "dev":

            $("#skills-development").css({
                "color" : "rgb(211, 2, 253)",
                "border" : "0.75px rgb(211, 2, 253) solid",
                "box-shadow" : "inset 0 0 7.5px rgb(211, 2, 253), 0 0 30px rgb(211, 2, 253)",
                "text-decoration" : "underline"
            });
        
            $("#skills-art, #skills-design").css({
                "border" : "0.5px rgb(72, 72, 255) solid",
                "color" : "rgb(83, 83, 253)",
                "text-decoration" : "none",
                "box-shadow" : "none"
            });

            document.getElementById("skills-desc-title").innerHTML = "development";
        
            CycleSkillsTable();

          break;

        default:
          alert("Something went wrong with setting SetSkillsContent()!");
      }
}

// ****************************** Skills Section: Select Skill Table Page Interactions ****************************** //

// 2 buttons are for scrolling through the possible pages of skills that go with 
// the selected skill type.
// 1 for scrolling the page number downward.
$("#skills-left-pg-button").click(function(){
    IncrementSkillsTablePageNumber('down');
    CycleSkillsTable();
    Reset_CycleSkillsTable_Count();
});
// 1 for scrolling the page number upward.
$("#skills-right-pg-button").click(function(){
    IncrementSkillsTablePageNumber('up');
    CycleSkillsTable();
    Reset_CycleSkillsTable_Count();
});

//
function IncrementSkillsTablePageNumber(dir)
{
    switch(dir) 
    {
        case "up":

            if(skillPage < TotalNumberOfSkillPages(skillType))
            {
                skillPage++;
            }   

            else if(skillPage == TotalNumberOfSkillPages(skillType))
            {
                skillPage = 1;
            }

          break;
          
        case "down":

            if(skillPage > 1)
            {
                skillPage--;
            }   

            else if(skillPage <= 1)
            {
                skillPage = TotalNumberOfSkillPages(skillType);
            }

          break;

        default:
          alert("Something went wrong with setting SetSkillsContent()!");
      }
}

//
function CycleSkillsTable()
{
    // Checks that the total number of pages in the skill table is greater
    // than 1 so that the page selection elements are turned on.
    if(TotalNumberOfSkillPages(skillType) > 1)
    {
        // Turning on the page selection buttons.
        $("#skills-left-pg-button, #skills-right-pg-button").css({
            "opacity" : "1"
        });

        // Turning on and setting the actual skill page number being shown on screen.
        document.getElementById("skill-page-number").innerHTML = "pg " + skillPage;
    }
    // Checks if the total number of pages in the skill is less than or equal to 1
    // so that the page selection elements are turned off.
    else if(TotalNumberOfSkillPages(skillType) <= 1)
    {
        // Turning off the page selection buttons.
        $("#skills-left-pg-button, #skills-right-pg-button").css({
            "opacity" : "0"
        });

        // Turning off the page number on screen.
        document.getElementById("skill-page-number").innerHTML = "";
    }

    // Like the function to set the skill type above, this check runs in the same fashion but
    // for the skill table pages.
    switch(skillType) 
    {
        // If first checks the type each time it's called.
        case "art":
            // Then it checks the skill table page number that should be displayed.
            switch(skillPage)
            {
                // Each page is set up with a basic standard of no more than 5 skills per page.
                case 1:
                    // The first area of setting up the table is to turn on/off the lines that will
                    // be displayed. Not all pages will have 5 skills. 
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    // The next area is changing the elements that are to be displayed.
                    // The first is the skill, tool and/or experience.
                    document.getElementById("skillA-title").innerHTML = "Maya";
                    // Second the numeric percentage of that skill, tool and/or experience.
                    document.getElementById("skillA-percentage").innerHTML = "60%";
                    // And last the percentage bar associated with the numeric percentage. 
                    rootVariables.style.setProperty('--skill-value-A', '60%');

                    document.getElementById("skillB-title").innerHTML = "3Ds Max";
                    document.getElementById("skillB-percentage").innerHTML = "30%";
                    rootVariables.style.setProperty('--skill-value-B', '30%');

                    document.getElementById("skillC-title").innerHTML = "Hard Surface 3D Modeling";
                    document.getElementById("skillC-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-C', '65%');

                    document.getElementById("skillD-title").innerHTML = "Soft Surface 3D Modeling";
                    document.getElementById("skillD-percentage").innerHTML = "20%";
                    rootVariables.style.setProperty('--skill-value-D', '20%');

                    document.getElementById("skillE-title").innerHTML = "Photoshop";
                    document.getElementById("skillE-percentage").innerHTML = "50%";
                    rootVariables.style.setProperty('--skill-value-E', '50%');

                    break;

                    case 2:
                    // The first area of setting up the table is to turn on/off the lines that will
                    // be displayed. Not all pages will have 5 skills. 
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    // The next area is changing the elements that are to be displayed.
                    // The first is the skill, tool and/or experience.
                    document.getElementById("skillA-title").innerHTML = "After Effects";
                    // Second the numeric percentage of that skill, tool and/or experience.
                    document.getElementById("skillA-percentage").innerHTML = "20%";
                    // And last the percentage bar associated with the numeric percentage. 
                    rootVariables.style.setProperty('--skill-value-A', '20%');

                    document.getElementById("skillB-title").innerHTML = "Illustrator";
                    document.getElementById("skillB-percentage").innerHTML = "10%";
                    rootVariables.style.setProperty('--skill-value-B', '10%');

                    document.getElementById("skillC-title").innerHTML = "Concept Art ~ Assets/Props";
                    document.getElementById("skillC-percentage").innerHTML = "70%";
                    rootVariables.style.setProperty('--skill-value-C', '70%');

                    document.getElementById("skillD-title").innerHTML = "Concept Art ~ Environment";
                    document.getElementById("skillD-percentage").innerHTML = "45%";
                    rootVariables.style.setProperty('--skill-value-D', '45%');

                    document.getElementById("skillE-title").innerHTML = "Concept Art ~ Character";
                    document.getElementById("skillE-percentage").innerHTML = "30%";
                    rootVariables.style.setProperty('--skill-value-E', '30%');

                    break;

                    case 3:
                    // The first area of setting up the table is to turn on/off the lines that will
                    // be displayed. Not all pages will have 5 skills. 
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    // The next area is changing the elements that are to be displayed.
                    // The first is the skill, tool and/or experience.
                    document.getElementById("skillA-title").innerHTML = "3D Materials/Textures";
                    // Second the numeric percentage of that skill, tool and/or experience.
                    document.getElementById("skillA-percentage").innerHTML = "55%";
                    // And last the percentage bar associated with the numeric percentage. 
                    rootVariables.style.setProperty('--skill-value-A', '55%');

                    document.getElementById("skillB-title").innerHTML = "VFX";
                    document.getElementById("skillB-percentage").innerHTML = "60%";
                    rootVariables.style.setProperty('--skill-value-B', '60%');

                    document.getElementById("skillC-title").innerHTML = "2D Sprite Creation";
                    document.getElementById("skillC-percentage").innerHTML = "45%";
                    rootVariables.style.setProperty('--skill-value-C', '45%');

                    document.getElementById("skillD-title").innerHTML = "Clip Studio Paint";
                    document.getElementById("skillD-percentage").innerHTML = "15%";
                    rootVariables.style.setProperty('--skill-value-D', '15%');

                    $("#skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "0"
                    });

                    break;

                default:
                    alert("Something went wrong with art set skill page check!!");
            }

          break;
          
        case "design":

            switch(skillPage)
            {
                case 1:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Story Design";
                    document.getElementById("skillA-percentage").innerHTML = "85%"; 
                    rootVariables.style.setProperty('--skill-value-A', '85%');

                    document.getElementById("skillB-title").innerHTML = "Game Design";
                    document.getElementById("skillB-percentage").innerHTML = "70%";
                    rootVariables.style.setProperty('--skill-value-B', '70%');

                    document.getElementById("skillC-title").innerHTML = "Mechanics System Design";
                    document.getElementById("skillC-percentage").innerHTML = "75%";
                    rootVariables.style.setProperty('--skill-value-C', '75%');

                    document.getElementById("skillD-title").innerHTML = "Environment Design";
                    document.getElementById("skillD-percentage").innerHTML = "70%";
                    rootVariables.style.setProperty('--skill-value-D', '70%');

                    document.getElementById("skillE-title").innerHTML = "Character Design";
                    document.getElementById("skillE-percentage").innerHTML = "85%";
                    rootVariables.style.setProperty('--skill-value-E', '85%');

                    break;

                case 2:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Level Design";
                    document.getElementById("skillA-percentage").innerHTML = "65%"; 
                    rootVariables.style.setProperty('--skill-value-A', '65%');

                    document.getElementById("skillB-title").innerHTML = "Combat System Design";
                    document.getElementById("skillB-percentage").innerHTML = "60%";
                    rootVariables.style.setProperty('--skill-value-B', '60%');

                    document.getElementById("skillC-title").innerHTML = "AI System Design";
                    document.getElementById("skillC-percentage").innerHTML = "35%";
                    rootVariables.style.setProperty('--skill-value-C', '35%');

                    document.getElementById("skillD-title").innerHTML = "UI Design";
                    document.getElementById("skillD-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-D', '65%');

                    document.getElementById("skillE-title").innerHTML = "Electronics Design";
                    document.getElementById("skillE-percentage").innerHTML = "25%";
                    rootVariables.style.setProperty('--skill-value-E', '25%');

                    break;

                case 3:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Google Drive";
                    document.getElementById("skillA-percentage").innerHTML = "85%"; 
                    rootVariables.style.setProperty('--skill-value-A', '85%');

                    document.getElementById("skillB-title").innerHTML = "Google Docs";
                    document.getElementById("skillB-percentage").innerHTML = "75%";
                    rootVariables.style.setProperty('--skill-value-B', '75%');

                    document.getElementById("skillC-title").innerHTML = "Google Sheets";
                    document.getElementById("skillC-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-C', '65%');

                    document.getElementById("skillD-title").innerHTML = "Prezi";
                    document.getElementById("skillD-percentage").innerHTML = "50%";
                    rootVariables.style.setProperty('--skill-value-D', '50%');

                    document.getElementById("skillE-title").innerHTML = "MS Word";
                    document.getElementById("skillE-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-E', '65%');

                    break;

                case 4:
                    document.getElementById("skillA-title").innerHTML = "MS Exel";
                    document.getElementById("skillA-percentage").innerHTML = "65%"; 
                    rootVariables.style.setProperty('--skill-value-A', '65%');

                    document.getElementById("skillB-title").innerHTML = "MS Power Point";
                    document.getElementById("skillB-percentage").innerHTML = "45%";
                    rootVariables.style.setProperty('--skill-value-B', '45%');

                    $("#skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "0"
                    });

                    break;

                default:
                    alert("Something went wrong with design set skill page check!!");
            }

          break;

        case "dev":

            switch(skillPage)
            {
                case 1:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Unity Engine";
                    document.getElementById("skillA-percentage").innerHTML = "80%"; 
                    rootVariables.style.setProperty('--skill-value-A', '80%');

                    document.getElementById("skillB-title").innerHTML = "Unreal Engine";
                    document.getElementById("skillB-percentage").innerHTML = "20%";
                    rootVariables.style.setProperty('--skill-value-B', '20%');

                    document.getElementById("skillC-title").innerHTML = "VR Experiences";
                    document.getElementById("skillC-percentage").innerHTML = "70%";
                    rootVariables.style.setProperty('--skill-value-C', '65%');

                    document.getElementById("skillD-title").innerHTML = "Mobile Android Experiences";
                    document.getElementById("skillD-percentage").innerHTML = "45%";
                    rootVariables.style.setProperty('--skill-value-D', '45%');

                    document.getElementById("skillE-title").innerHTML = "Mobile IOS Experiences";
                    document.getElementById("skillE-percentage").innerHTML = "30%";
                    rootVariables.style.setProperty('--skill-value-E', '30%');

                    break;

                case 2:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "PC Experiences";
                    document.getElementById("skillA-percentage").innerHTML = "65%"; 
                    rootVariables.style.setProperty('--skill-value-A', '65%');

                    document.getElementById("skillB-title").innerHTML = "Oculus Rift";
                    document.getElementById("skillB-percentage").innerHTML = "50%";
                    rootVariables.style.setProperty('--skill-value-B', '50%');

                    document.getElementById("skillC-title").innerHTML = "HTC Vive";
                    document.getElementById("skillC-percentage").innerHTML = "40%";
                    rootVariables.style.setProperty('--skill-value-C', '40%');

                    document.getElementById("skillD-title").innerHTML = "Oculus Quest";
                    document.getElementById("skillD-percentage").innerHTML = "45%";
                    rootVariables.style.setProperty('--skill-value-D', '45%');

                    document.getElementById("skillE-title").innerHTML = "Visual Studio";
                    document.getElementById("skillE-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-E', '65%');

                    break;

                case 3:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Visual Studio Code";
                    document.getElementById("skillA-percentage").innerHTML = "60%"; 
                    rootVariables.style.setProperty('--skill-value-A', '60%');

                    document.getElementById("skillB-title").innerHTML = "Blueprint";
                    document.getElementById("skillB-percentage").innerHTML = "25%";
                    rootVariables.style.setProperty('--skill-value-B', '25%');

                    document.getElementById("skillC-title").innerHTML = "C#";
                    document.getElementById("skillC-percentage").innerHTML = "70%";
                    rootVariables.style.setProperty('--skill-value-C', '70%');

                    document.getElementById("skillD-title").innerHTML = "C++";
                    document.getElementById("skillD-percentage").innerHTML = "35%";
                    rootVariables.style.setProperty('--skill-value-D', '35%');

                    document.getElementById("skillE-title").innerHTML = "Javascript";
                    document.getElementById("skillE-percentage").innerHTML = "65%";
                    rootVariables.style.setProperty('--skill-value-E', '65%');

                    break;

                case 4:
                    $("#skillA-title, #skillA-percentage, #skillA-line, #skillB-title, #skillB-percentage, #skillB-line, #skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "1"
                    });

                    document.getElementById("skillA-title").innerHTML = "Html";
                    document.getElementById("skillA-percentage").innerHTML = "60%"; 
                    rootVariables.style.setProperty('--skill-value-A', '60%');

                    document.getElementById("skillB-title").innerHTML = "Css";
                    document.getElementById("skillB-percentage").innerHTML = "40%";
                    rootVariables.style.setProperty('--skill-value-B', '40%');

                    document.getElementById("skillC-title").innerHTML = "Python";
                    document.getElementById("skillC-percentage").innerHTML = "25%";
                    rootVariables.style.setProperty('--skill-value-C', '25%');

                    document.getElementById("skillD-title").innerHTML = "Jquery";
                    document.getElementById("skillD-percentage").innerHTML = "20%";
                    rootVariables.style.setProperty('--skill-value-D', '20%');

                    document.getElementById("skillE-title").innerHTML = "PHP";
                    document.getElementById("skillE-percentage").innerHTML = "15%";
                    rootVariables.style.setProperty('--skill-value-E', '15%');

                    break;

                case 5:
                    document.getElementById("skillA-title").innerHTML = "Git";
                    document.getElementById("skillA-percentage").innerHTML = "45%"; 
                    rootVariables.style.setProperty('--skill-value-A', '45%');

                    document.getElementById("skillB-title").innerHTML = "Github";
                    document.getElementById("skillB-percentage").innerHTML = "60%";
                    rootVariables.style.setProperty('--skill-value-B', '60%');

                    $("#skillC-title, #skillC-percentage, #skillC-line, #skillD-title, #skillD-percentage, #skillD-line, #skillE-title, #skillE-percentage, #skillE-line").css({
                        "opacity" : "0"
                    });

                    break;

                default:
                    alert("Something went wrong with dev set skill page check!!");
            }

          break;

        default:
          alert("Something went wrong with set skill type check!!");
      }
}
