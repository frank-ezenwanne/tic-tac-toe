var turn = "X" //set initial turn for x
var remained = []
/* will contain boxes that have not been clicked..this is so 
    to allow the removeEventListener at the game won stage to focus on just unclicked boxes*/
document.getElementById("continue-button").addEventListener("click",continue_game)
document.getElementById("reset-button").addEventListener("click",reset)
var player = "human" //tracks the entity playing... "human" for Human...."cpu" for Computer
var game_won = false
 console.log(document.getElementById("continue-button").style.backgroundColor)
function continue_game() {

    if( (obj.size === 9) || (game_won === true) ){

            for (box of get_grids) {
                box.innerText = ""
            }
            for (var i = 0; i < get_grids.length; i++) { //attach click event listener to all boxes
                remained.push(get_grids[i])
                get_grids[i].addEventListener("click", compme_play)
                get_grids[i].classList.add("hover-class")
                get_grids[i].style.backgroundColor = "white"
            }

            obj = new Map()//clear all mapped instances of ids to boxes

                if(player === "human"){
                    comp_play()//if last player was human let the computer start the game
                }

                else if(player === "cpu") {
                       if(turn === 'X'){
                        turn = 'O'
                    }
                    else if(turn === "O"){
                        turn = 'X'
                    }
                    document.getElementById("who-won").innerText = turn + "'s Turn ( Your Turn )"
                }
            document.getElementById("continue-button").style.backgroundColor = "rgb(50,50,50)"
            document.getElementById("continue-button").style.color = "black"
            document.getElementById("continue-button").style.cursor = "text"
           document.getElementById("continue-button").disabled = true
            return obj,turn
        }
}
                



function reset() { //reset everything including next player!!
    for (box of get_grids) {
        box.innerText = ""
    }
    for (var i = 0; i < get_grids.length; i++) { //attach click event listener to all boxes
        remained.push(get_grids[i])
        get_grids[i].addEventListener("click", compme_play)
        get_grids[i].classList.add("hover-class")
        get_grids[i].style.backgroundColor = "white"



    }
    obj = new Map()//clear all mapped instances of ids to boxes
    if (turn === "X") { 
      
        turn = "O"
        document.getElementById("who-won").innerText = " O's Turn ( Your Turn )"
    } else if (turn === "O") {
        turn = "X"
        document.getElementById("who-won").innerText = " X's Turn ( Your Turn )"
    }
    document.getElementById("continue-button").style.backgroundColor = "rgb(50,50,50)"
    document.getElementById("continue-button").style.color = "black"
    document.getElementById("continue-button").style.cursor = "text"
    document.getElementById("continue-button").disabled = true
    return obj, turn
}


var get_grids = document.getElementsByClassName("grid-box") //get all boxes

for (var i = 0; i < get_grids.length; i++) { //attach click event listener to all boxes
    remained.push(get_grids[i])
    get_grids[i].addEventListener("click", compme_play)
}
var obj = new Map() //create a map object to contain mappings of clicked boxes to their "X" and "O" values
var combo = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"],
    ["1", "5", "9"]
]

//combo contains a list of all possible combinations that must have same values i.e X or O for victory!!



function compme_play(e) {
    game_won = false
    player = "human"
    var id = event.target.id //get id of clicked box
    obj.set(id, turn) //map the id to the X or O value
    e.target.innerHTML = turn //type the value into the respective box
    e.target.classList.remove("hover-class") // remove the highlight class from clicked box
    e.target.removeEventListener("click", compme_play) //remove eventlistener from clicked box
    index = remained.indexOf(e.target) //get index of clicked box in the remained list
    remained.splice(index, 1) //using the index ,just remove the element from the element list straight away
    if (obj.size >= 1) {
        loop1: for (var col of combo) { //for each possible combo in the combo list...
            var hold = [] //create a new container to hold the corresponding values of the id
            loop2: for (var num of col) { //for each id in a particular combo in the combo list...
                if (obj.has(num) === false) {
                    /*if the id has not been mapped in obj i.e if the box
                                         corresponding to the id has not been clicked...*/

                    continue loop1
                    /*go back to the combo list and go to the next combo because all the boxes in
                                            a combo list must be clicked..*/
                } else { //..else add the value of the id to the hold list

                    hold.push(obj.get(num))
                }
            }

            if (hold.length === 3) { //if length of hold is 3...

                if ((hold[0] === hold[1]) && (hold[0] === hold[2]) && (hold[1] === hold[2])) {
                    //check if all values are equal..
                    if(player === "human"){
                    document.getElementById("who-won").innerText = "YOU WON !!!!"}
                    else{
                        document.getElementById("who-won").innerText = "YOU LOST.. !!!!"}
                    //if equal..print out winner
                    for (var j = 0; j < remained.length; j++) {
                        remained[j].classList.remove("hover-class") //as the game is over,just remove highlight class from the unclicked boxes
                        remained[j].removeEventListener("click", compme_play) //remove eventlisteners from the unclicked boxes

                    }
                    for (id of col) {
                        if(player === "human"){
                        document.getElementById(id).style.backgroundColor = "lightgreen"} //put a green colour over winning trio boxes!!
                        else{
                             document.getElementById(id).style.backgroundColor = "red"
                        }
                        game_won = true

                    }
                        
                    document.getElementById("continue-button").disabled = false
                    document.getElementById("continue-button").style.cursor = "pointer"
                     document.getElementById("continue-button").style.backgroundColor = "green"
                    document.getElementById("continue-button").style.color = "white"
                    return
                } //exit function!!
                else {
                    continue loop1 //but if the values aren't equal go back to the combo list as usual
                }
            } else {
                continue loop1
            } //if the length of the hold list isn't 3 the let's go back as usual to the combo list

        }


        if (obj.size === 9) {
            /*if all spaces have been taken..display no winner!!All the code above makes
                                        sure that all the boxes have been checked for a winning trio before this stage*/
            document.getElementById("who-won").innerText = "No winner"
            document.getElementById("continue-button").disabled = false
            document.getElementById("continue-button").style.backgroundColor = "green"
            document.getElementById("continue-button").style.color = "white"
            document.getElementById("continue-button").style.cursor = "pointer"
            return //exit as there is no winner..!!
        } else {//else run computer play function
            comp_play()
        }
    }

}

function comp_play() {
    player = "cpu"
    var [possib1,two_way_num] = comp_think()//get possible spots that the computer can play in
    var gamer
    if (turn === "X") {//if current turn is X ,make it O's turn i.e computer's turn and vice versa
        gamer = "X"
        
        turn = "O"

    } else if (turn === "O") {
        gamer = "O"
        turn = "X"

    }

    if (obj.size >= 3) { //start deep analysis only when the no of selected boxes is >= 3
        var temp = []//create temporary container for storing selected boxes that have been selected by the opponent
        for (match of obj.keys()) {

            if (obj.get(match) === gamer) {


                temp.push(match)//store matching boxes
            }
        }
            if(temp.length >= 2){//if opponent has selected up to 2 boxes
                            var big = []
                            var two_way_opp =[]
                            var big2 =[]//container for storing combos
                            l_combo = 0//counter to cruise through all combos in winning trio combos list

                            combo_check(l_combo)
                            function combo_check(l_combo){
                                if(l_combo < combo.length){
                                    temp2 =[]
                                    count = 0
                                    for(var x = 0 ; x<3; x++){
                                        if(temp.indexOf(combo[l_combo][x]) !== -1 ){//if the element is present in a combo..
                                            temp2.push(combo[l_combo][x])//..put it in temp2
                                        }
                                    }
                                    if(temp2.length >= 2){/*at the end of the loop, if temp2 was able to catch at least 2 elements
                                    in a combo..it means there is a possibility for selection especially if just 2 has been taken so just collect it in big2 
                                        */
                                            big2.push(combo[l_combo])
                                        }
                                    else if(temp2.length === 1){
                                        big.push(combo[l_combo])
                                    }

                                    combo_check(l_combo + 1)}//go back to combo_check function so we can just move to the next combo to check itz trio
                                else{
                                    return big2//at the end of the stuff...just give back the list of potential trios the opponent can use to defeat the computer
                                }

                                
                            }
            
            if(big.length > 0){
                var big_split =[]
                for(let elem of big){
                    for (let num of elem){
                        big_split.push(num)
                    }
                }
                var freq_map = new Map()
                for (let val of big_split) {
                    freq_map.set(val, big_split.filter(x => x === val).length)
                }
                let max_val = Math.max(...freq_map.values())
                if(max_val >= 2){
                    for (let key of freq_map.keys()) {
                         if ( (freq_map.get(key) === max_val) && (obj.has(key) === false) ) {
                            two_way_opp.push(key)
                        }
                    }
               } 
            }
            

            if( (big2.length > 0) && (big.length >0) ){//if big 2 was able to collect something..
      
                var possib = []//create an empty container to hold screened trios
                for (var packet of big2) {
                    count = 0
                    for (var pack of packet) {
                        if (obj.has(pack) === false) {
                            possib.push(pack)
                        } else {
                            count = count + 1
                        }

                    }


                }
                if(obj.size === 3 && (obj.has("1") && obj.has("5") && obj.has("9") ) ){
                  num_list = shuffleArray(["2","4","6","8"])
                       loop10: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                                console.log("677")
                            break
                        } 
                    }}
                else if(obj.size === 3 && (obj.has("3") && obj.has("5") && obj.has("7") ) ){
                  num_list = shuffleArray(["2","4","6","8"])
                       loop10: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                                console.log("677")
                            break
                        } 
                    }}

                else if (possib1.length > 0) {//if there is/are winning trio spots for computer to play..that takes first priority
                    var comp_sele = document.getElementById(possib1[0])//get the possible winning trio
                } else if (possib.length > 0) {//if there are no winning trios..the 2nd priority is 2 block the opponent's winning trio
                    var comp_sele = document.getElementById(possib[0])
                } else if(two_way_num.length > 0){
                    console.log(9999)
                    two_way_num = shuffleArray(two_way_num)
                    var comp_sele = document.getElementById(two_way_num[0])
                    console.log(comp_sele)
                }
                
                
            
                else if(two_way_opp.length > 0){
                    two_way_opp = shuffleArray(two_way_opp)
                    var comp_sele = document.getElementById(two_way_opp[0])
                    console.log(comp_sele)
                }
                    
                 
                
                else{//else play in any unclicked box
                    console.log("89")
                    num_list = ["1","3","7","9"]
                    num_list = shuffleArray(num_list)
                   loop23: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

                            continue loop23
                        }
                    }
                }

                comp_sele.innerText = turn//put the play i.e either X or O in the respective box.

                var ind_r = remained.indexOf(comp_sele)//get the index of the selected box id
                remained.splice(ind_r, 1)//use the index to remove the box
                obj.set(comp_sele.id, turn)//Map the box id to the play..X or O
                comp_sele.classList.remove("hover-class") // remove the highlight class from clicked box
                comp_sele.removeEventListener("click", compme_play)//remove event listener
                if (obj.size >= 1) {
                    loop0: for (var col of combo) { //for each possible combo in the combo list...
                        var hold = [] //create a new container to hold the corresponding values of the id
                        loop12: for (var num of col) { //for each id in a particular combo in the combo list...
                            if (obj.has(num) === false) {
                                /*if the id has not been mapped in obj i.e if the box
                                                     corresponding to the id has not been clicked...*/

                                continue loop0
                                /*go back to the combo list and go to the next combo because all the boxes in
                                                        a combo list must be clicked..*/
                            } else { //..else add the value of the id to the hold list

                                hold.push(obj.get(num))
                            }
                        }

                        if (hold.length === 3) { //if length of hold is 3...

                            if ((hold[0] === hold[1]) && (hold[0] === hold[2]) && (hold[1] === hold[2])) {
                                //check if all values are equal..
                                 if(player === "human"){
                                    document.getElementById("who-won").innerText = "YOU WON !!!!"}
                                 else{
                                    document.getElementById("who-won").innerText = "YOU LOST...!!!!"}
                                //if equal..print out winner
                                for (var j = 0; j < remained.length; j++) {
                                    remained[j].classList.remove("hover-class") //as the game is over,just remove highlight class from the unclicked boxes
                                    remained[j].removeEventListener("click", compme_play) //remove eventlisteners from the unclicked boxes

                                }
                                for (id of col) {
                                    if(player === "human"){
                                    document.getElementById(id).style.backgroundColor = "lightgreen"} //put a green colour over winning trio boxes!!
                                    else{
                                         document.getElementById(id).style.backgroundColor = "red"
                                    }
                                    game_won = true

                                }
                                    document.getElementById("continue-button").disabled = false
                                    document.getElementById("continue-button").style.backgroundColor = "green"
                                    document.getElementById("continue-button").style.color = "white"
                                    document.getElementById("continue-button").style.cursor = "pointer"
                                return
                            } //exit function!!
                            else {
                                continue loop0 //but if the values aren't equal go back to the combo list as usual
                            }
                        } else {
                            continue loop0
                        } //if the length of the hold list isn't 3 the let's go back as usual to the combo list

                    }


                    if (obj.size === 9) {
                        /*if all spaces have been taken..display no winner!!All the code above makes
                                                    sure that all the boxes have been checked for a winning trio before this stage*/
                        document.getElementById("who-won").innerText = "No winner"
                        document.getElementById("continue-button").style.backgroundColor = "green"
                        document.getElementById("continue-button").style.color = "white"
                        document.getElementById("continue-button").disabled = false
                        document.getElementById("continue-button").style.cursor = "pointer"
                        return //exit as there is no winner..!!
                    } else {

                        if (turn === "X") {
                            /*..else if it were X's turn before, switch to "O" and display 
                                                            who's turn and vice versa*/
                            turn = "O"
                            document.getElementById("who-won").innerText = "O's Turn ( Your Turn )"
                        } else if (turn === "O") {
                            turn = "X"
                            document.getElementById("who-won").innerText = "X's Turn ( Your Turn )"
                        }
                        return turn
                    }
                }
            }
            //if big2.length>0
            
            
            else {
                 num_list = ["1","3","7","9"]
                    num_list = shuffleArray(num_list)
                   loop20: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            num_list = shuffleArray(num_list)
                            
                            
                            continue loop20
                        }
                    }
                comp_sele.innerText = turn
                var ind_r = remained.indexOf(comp_sele)
                remained.splice(ind_r, 1)
                obj.set(comp_sele.id, turn)
                comp_sele.classList.remove("hover-class") // remove the highlight class from clicked box
                comp_sele.removeEventListener("click", compme_play)

                if (turn === "X") {
                    /*..else if it were X's turn before, switch to "O" and display 
                                                    who's turn and vice versa*/
                    turn = "O"
                    document.getElementById("who-won").innerText = "O's Turn ( Your Turn )"
                } else if (turn === "O") {
                    turn = "X"
                    document.getElementById("who-won").innerText = "X's Turn ( Your Turn )"
                }
                return turn
            } //if big.length is not < 0




        } //if temp.length > 2
        else {
            if( (obj.has("1") === true) && (obj.has("5") === true) ){
               var comp_sele = document.getElementById("9")
               comp_sele.innerText = turn
            }
            
            else if ( (obj.has("3") === true) && (obj.has("5") === true) ){
                var comp_sele = document.getElementById("7")
                comp_sele.innerText = turn
            }

            else if ( (obj.has("5") === true) && (obj.has("7") === true) ){
                var comp_sele = document.getElementById("3")
                comp_sele.innerText = turn
            }
            
            else if ( (obj.has("9") === true) && (obj.has("5") === true) ){
                var comp_sele = document.getElementById("1")
                comp_sele.innerText = turn
            }

            else if( obj.has("1")=== true || obj.has("3") === true || obj.has("7") === true || obj.has("9") === true ){
                
                var comp_sele = document.getElementById("5")
                comp_sele.innerText = turn
            }
                else if( obj.has("2") === true || obj.has("4") === true || obj.has("6") === true || obj.has("8") === true ){
                num_list = ["1","3","7","9"]
                num_list = shuffleArray(num_list)
                   loop25: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            
                            continue loop25
                        }
                    }
            }

            else{
           
                   num_list = ["1","3","7","9"]
                    num_list = shuffleArray(num_list)
                   loop29: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            num_list = shuffleArray(num_list)
                            
                            
                            continue loop29
                        }
                }}

            comp_sele.innerText = turn
            var ind_r = remained.indexOf(comp_sele)
            remained.splice(ind_r, 1)
            obj.set(comp_sele.id, turn)
            comp_sele.classList.remove("hover-class") // remove the highlight class from clicked box
            comp_sele.removeEventListener("click", compme_play)

            if (turn === "X") {
                /*..else if it were X's turn before, switch to "O" and display 
                                                who's turn and vice versa*/
                turn = "O"
                document.getElementById("who-won").innerText = "O's Turn ( Your Turn )"
            } else if (turn === "O") {
                turn = "X"
                document.getElementById("who-won").innerText = "X's Turn ( Your Turn )"
            }
            }
        return turn
    } //if obj >= 3
    else {
        if( (obj.has("1")) && (obj.has("5")) ){
               var comp_sele = document.getElementById("9")
               comp_sele.innerText = turn
            }
            
            else if ( (obj.has("3")) && (obj.has("5")) ){
                var comp_sele = document.getElementById("7")
                comp_sele.innerText = turn
            }

            else if ( (obj.has("5")) && (obj.has("7")) ){
                var comp_sele = document.getElementById("3")
                comp_sele.innerText = turn
            }
            
            else if ( (obj.has("9")) && (obj.has("5")) ){
                var comp_sele = document.getElementById("1")
                comp_sele.innerText = turn
            }

            else if( obj.has("1") || obj.has("3") || obj.has("7") || obj.has("9") ){
                var comp_sele = document.getElementById("5")
                comp_sele.innerText = turn
            }

              else if( obj.has("2") || obj.has("4") || obj.has("6") || obj.has("8") ){
                num_list = ["1","3","7","9"]
                num_list = shuffleArray(num_list)
                   loop31: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            
                            continue loop31
                        }
                    }
            }
            else if (obj.has("5")){
            num_list = ["1","3","7","9"]
                num_list = shuffleArray(num_list)
                   loop33: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            
                            continue loop33
                        }
             
            }}
        
            

            else{
           
       
             num_list = ["1","3","7","9"]
                    num_list = shuffleArray(num_list)
                   loop27: for (num of num_list) {
                        if (obj.has(num) === false) {
                            var comp_sele = document.getElementById(num)
                            break
                        }
                        else{
                            num_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                            num_list = shuffleArray(num_list)
                            
                            
                            continue loop27
                        }
            }}

           comp_sele.innerText = turn
            var ind_r = remained.indexOf(comp_sele)
            remained.splice(ind_r, 1)
            obj.set(comp_sele.id, turn)
            comp_sele.classList.remove("hover-class") // remove the highlight class from clicked box
            comp_sele.removeEventListener("click", compme_play)

            if (turn === "X") {
                /*..else if it were X's turn before, switch to "O" and display 
                                                who's turn and vice versa*/
                turn = "O"
                document.getElementById("who-won").innerText = "O's Turn ( Your Turn )"
            } else if (turn === "O") {
                turn = "X"
                document.getElementById("who-won").innerText = "X's Turn ( Your Turn )"
            
            }return turn

        
    }
}




function comp_think() {
    /*the code in this block is similar to that above in comp_play but here, the computer is trying to
    get winning trio for itself unlike in comp_play where the computer is trying to get the opponent's possible
    winning trio to block it!

    NB: comp_think() has more priority than comp_play as winning is key!
     */
    var possib1 = []
    var two_way_num = []
    if (turn === "X") {
        
        comp_turn = "O"

    } else if (turn === "O") {

        comp_turn = "X"

    }
    console.log(obj)
    if (obj.size >= 0) {

        var temp = []
        for (match1 of obj.keys()) {

            if (obj.get(match1) === comp_turn) {


                temp.push(match1)
            }

        }


        var big = []
        var big2 = 0
        let temp2 = []
            if(temp.length >= 2){
                        var big2 =[]
                        l_combo = 0

                        combo_check(l_combo)
                        function combo_check(l_combo){
                            if(l_combo < combo.length){
                                temp2 =[]
                                count = 0
                                for(var x = 0 ; x<3; x++){
                                    if(temp.indexOf(combo[l_combo][x]) !== -1 ){
                                        temp2.push(combo[l_combo][x])
                                    }
                                }
                                if(temp2.length >= 2){
                                        big2.push(combo[l_combo])
                                    }
                                else if(temp2.length === 1){
                                    big.push(combo[l_combo])
                                }

                                combo_check(l_combo + 1)}
                            else{
                                return big2
                            }

                            
                        }

            console.log(big2)

            
            if (big2.length > 0) {
                for (var packet of big2) {

                    for (var pack of packet) {
                        if (obj.has(pack) === false) {
                            possib1.push(pack)
                        }


                    }



                }
            }
            if(big.length > 0){
                
                var big_split =[]
                for(let elem of big){
                    for (let num of elem){
                        big_split.push(num)
                    }
                }
                var freq_map = new Map()
                for (let val of big_split) {
                    freq_map.set(val, big_split.filter(x => x === val).length)
                }
                let max_val = Math.max(...freq_map.values())
                if(max_val >= 2){
                    for (let key of freq_map.keys()) {
                        if ( (freq_map.get(key) === max_val) && (obj.has(key) === false) ) {
                            two_way_num.push(key)
                        }
                    }
                
               } 
            }
        }
    }
    console.log(possib1)
    return [possib1,two_way_num]
}


function shuffleArray(array) {//This function shuffles the array when a random selection is to be picked
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}