function setupVoiceCommands() {
    if (annyang) {
      const commands = {
        'hello': () => alert('Hello World!'),
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color;
          console.log(`Background changed to ${color}`);
        },
        'navigate to *page': (page) => {
          const lower = page.toLowerCase();
          if (lower.includes("home")) window.location.href = "asg3homepage.html";
          else if (lower.includes("stocks")) window.location.href = "asg3stocks.html";
          else if (lower.includes("dogs")) window.location.href = "asg3dogs.html";
          else alert("Page not found.");
        }
      };
  
      annyang.addCommands(commands);
      annyang.start({ autoRestart: true, continuous: true });
  
      console.log("Annyang started!");
    } else {
      console.error("Annyang not supported or not loaded.");
    }
  }
  
  document.getElementById('start-voice')?.addEventListener('click', () => {
    setupVoiceCommands();
  });
  
  document.getElementById('stop-voice')?.addEventListener('click', () => {
    if (annyang) {
      annyang.abort();
      console.log("Annyang stopped.");
    }
  });
  