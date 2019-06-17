function threeTwoOneGo(){

	$("tbody").html("<tr><th>Name</th><th>Branch</th><th>Seat Pool</th><th>Opening Rank</th><th>Closing Rank</th></tr>");

	let name = $("input:nth-of-type(1)").val().split(",");		// Name of college
	let nameLength = name.length;
	let branch = $("input:nth-of-type(2)").val().split(","); 	// Name of branch(es)
	let branchLength = branch.length;							// Number of branches
	let seatPool = $("input:nth-of-type(3)").val();				// Female only or Gender Neutral
	let rank = 0;												// The default value
	if($("input:nth-of-type(4)").val() != "") rank = parseInt($("input:nth-of-type(4)").val());		// Value from text field if any
	let cRank = Infinity;										// The default balue
	if($("input:nth-of-type(5)").val() != "") cRank = parseInt($("input:nth-of-type(5)").val());	// Value from text field if any
	let detailsArr = [];


	$.getJSON('round7.json', function(data){	//Get the data as JSON

		let totalPages = data.pageTables.length;

		for(let i = 0; i < totalPages; i++){	// to loop over the pages

			for(let k = 1; k < data.pageTables[i].tables.length; k++){ // to loop over each row in a page
				let thisData = data.pageTables[i].tables[k];
				let branchGood = false;
				let collegeGood = false;
				for(let j = 0; j < branchLength; j++){
					if(thisData[2].toLowerCase().indexOf(branch[j].trim().toLowerCase()) != -1){
						branchGood = true;
					}
				}


				for(let j = 0; j < nameLength; j++){
					console.log(name);
					if(thisData[1].toLowerCase().indexOf(name[j].trim().toLowerCase()) != -1){
						collegeGood = true;
					}
				}


				if(branchGood && ((thisData[3] == "OS") || (thisData[3] == "AI")) && (thisData[4] == "OPEN") && (thisData[5].toLowerCase().indexOf(seatPool.toLowerCase()) != -1) && collegeGood && (thisData[7] >= rank) && (thisData[7] <= cRank)){
					detailsArr.push([thisData[1], thisData[2], thisData[5], thisData[6], thisData[7]]);
				}
			}

		}



		if(document.getElementById("chkbx").checked){
			detailsArr.sort((a,b) => a[4] - b[4]);
			console.log(detailsArr);
		}

		for(let i = 0; i < detailsArr.length; i++){
			$("tbody").append("<tr><td>" + detailsArr[i][0] + "</td><td>" + detailsArr[i][1] + "</td><td>" + detailsArr[i][2] + "</td><td>" + detailsArr[i][3] + "</td><td>" + detailsArr[i][4] + "</td></tr>");
		}
	});

}



// thisData[0] = Round Number
// thisData[1] = College Name
// thisData[2] = Branch
// thisData[3] = State Quota n Stuff
// thisData[4] = Caste Quota n Stuff
// thisData[5] = Female Quota n Stuff
// thisData[6] = Opening Rank
// thisData[7] = Closing Rank





function howToUse(){
	alert(`To be used only to filter Round 7(2018) cutoffs given on official JoSAA website.

College name : Enter the complete word which occurs at least once in the name of the college. Example : \"IIT\" won't match anything, but \"Indian\" will.
Branch: Enter the complete word(or words separated by a comma), instead of abbreviations like CS, ECE etc. Example : \"computer\", \"ElEcTrIcAl\", \"Computer  ,     ElEcTriCal\" are valid.
Seat Pool : Enter \"F\" for Female only, \"G\" for Gender Neutral, or leave blank for both.
Includes Rank : Matches colleges whose cutoffs allow admission to the student with this rank.
Closing Rank < : The upper limit to the closing ranks

Their won't be any errors (if any) displayed on the webpage itself in case you're trying to mess up with the criteria. Use Ctrl + Shift + I for Chrome, or <<Insert text here after Googling>> for other browsers to view the console.`);
}


/*	Trying some node and npm
function getTable(){
	let pdf_table_extractor = require('pdf-table-extractor');

	function success(result){
		console.log(JSON.stringify(result));
	}

	function error(e){
		console.error(e);
	}

	pdf_table_extractor("round7.pdf", success, error);
}


getTable();
*/

function sortByClosingRanks(){

}
