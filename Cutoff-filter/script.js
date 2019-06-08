function threeTwoOneGo(){

	$("tbody").html("<tr><th>Name</th><th>Branch</th><th>Seat Pool</th><th>Opening Rank</th><th>Closing Rank</th></tr>");

	let name = $("input:nth-of-type(1)").val(); // Name of college
	let branch = $("input:nth-of-type(2)").val().split(","); // Name of branch
	let branchLength = branch.length;
	let seatPool = $("input:nth-of-type(3)").val();
	let oRank = 0;	//The default value
	if($("input:nth-of-type(4)").val() != "") oRank = parseInt($("input:nth-of-type(4)").val());	// Value form text field if any
	let cRank = Infinity;	//The default value
	if($("input:nth-of-type(5)").val() != "") cRank = parseInt($("input:nth-of-type(5)").val());	// Value from text field if any

	// * // * // * // * // * // * // * // * |||||||| * \\ * \\ * \\ * \\ * \\ * \\ * \\ * \\



	$.getJSON('round7.json', function(data){	//Get the data as JSON

		let totalPages = data.pageTables.length;

	// data[i][0] = Round Number
	// data[i][1] = College Name
	// data[i][2] = Branch
	// data[i][3] = State Quota n Stuff
	// data[i][4] = Caste Quota n Stuff
	// data[i][5] = Female Quota n Stuff
	// data[i][6] = Opening Rank
	// data[i][7] = Closing Rank

		for(let i = 0; i < totalPages; i++){	// to loop over the pages

			for(let k = 1; k < data.pageTables[i].tables.length; k++){ // to loop over each row in a page
				let thisData = data.pageTables[i].tables[k];
					let branchGood = false;
					for(let j = 0; j < branchLength; j++){
						if(thisData[2].toLowerCase().indexOf(branch[j].trim().toLowerCase()) != -1){
							branchGood = true;
							//return;
						}
					}
					if(branchGood && (thisData[4] == "OPEN") && (thisData[5].toLowerCase().indexOf(seatPool.toLowerCase()) != -1) && (thisData[1].toLowerCase().indexOf(name.toLowerCase()) != -1) && (thisData[6] >= oRank) && (thisData[7] >= cRank)){
						$("tbody").append("<tr><td>" + thisData[1] + "</td><td>" + thisData[2] + "</td><td>" + thisData[5] + "</td><td>" + thisData[6] + "</td><td>" + thisData[7] + "</td></tr>");
					}
			}

		}
	});

}

function howToUse(){
	alert("To be used only to filter Round 7(2018) cutoffs given on official JoSAA website. \n \nCollege name : Enter the complete word which occurs at least once in the name of the college. Example : \"IIT\" won't match anything, but \"Indian\" will. \nBranch: Enter the complete word(or words separated by a comma), instead of abbreviations like CS, ECE etc. Example : \"computer\", \"ElEcTrIcAl\", \"Computer  ,     ElEcTriCal\" are valid.\nSeat Pool : Enter \"F\" for female only, \"G\" for Gender Neutral, or leave blank for both. \nOpening Rank : Colleges with Opening ranks greater than or equal to the number entered here will be matched. \nClosing Rank : Colleges with Closing ranks greater than or equal to the number entered here will be matched.\n\nTheir won't be any errors (if any) displayed on the webpage itself in case you're trying to mess up with the criteria. Use Ctrl + Shift + I for Chrome, or <<Insert text here after Googling>> for other browsers to view the console.");
}
