function automateStuff(){
	let text = document.getElementById('meh').value;
	document.getElementById('mehResult').value = text.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/:/g , "\\:").replace(/'/g , "\\'").replace(/"/g , "\\\"");
}



function copyFunc(){

	let copyText = `                         *     .--.
                              / /  \`
             +               | |
                    '         \\ \\__,
                *          +   '--'  *
                    +   /\\
       +              .'  '.   *
              *      /======\\      +
                    ;\:.  _   ;
                    |\:. (_)  |
                    |\:.  _   |
          +         |\:. (_)  |          *
                    ;\:.      ;
                  .' \\\:.    / \`.
                 / .-''\:._.'\`-. \\
                 |/    /||\\    \\|
           jgs _..--"""\`\`\`\`"""--.._
         _.-'\`\`                    \`\`'-._
       -'                                '-

          Obviously I haven't made this ;P`;

	let textArea = document.createElement("textArea");
  textArea.style.cssText = 'position: fixed; top: 0; left: 0; width: 2em; height: 2em; padding: 0; border: none; outline: none; boxShadow: none; background: transparent';

  textArea.value = copyText;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('Copy');
  document.body.removeChild(textArea);


}
