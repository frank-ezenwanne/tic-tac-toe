var turn = "X" //set initial turn for x
var remained = []
/* will contain boxes that have not been clicked..this is so 
	to allow the removeEventListener at the game won stage to focus on just unclicked boxes*/
document.getElementById("button").addEventListener("click", reset)

var get_grids = document.getElementsByClassName("grid-box") //get all boxes

for (var i = 0; i < get_grids.length; i++) { //attach click event listener to all boxes
    remained.push(get_grids[i])
    get_grids[i].addEventListener("click", getid_map)
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

function reset() { //reset everything including next player!!
    for (box of get_grids) {
        box.innerText = ""
    }
    for (var i = 0; i < get_grids.length; i++) { //attach click event listener to all boxes
        remained.push(get_grids[i])
        get_grids[i].addEventListener("click", getid_map)
        get_grids[i].classList.add("hover-class")
        get_grids[i].style.backgroundColor = "white"



    }
    obj = new Map()
    if (turn === "X") {
        /*same as above..This block runs when the number of mapped ids in 
        			obj isn't yet 3..so we just switch turns directly*/
        turn = "O"
        document.getElementById("who-won").innerText = "O's Turn"
    } else if (turn === "O") {
        turn = "X"
        document.getElementById("who-won").innerText = "X's Turn"
    }
    return obj, turn
}

function getid_map(e) {
    var id = event.target.id //get id of clicked box
    obj.set(id, turn) //map the id to the X or O value
    e.target.innerHTML = turn //type the value into the respective box
    e.target.classList.remove("hover-class") // remove the highlight class from clicked box
    e.target.removeEventListener("click", getid_map) //remove eventlistener from clicked box
    index = remained.indexOf(e.target) //get index of clicked box in the remained list
    remained.splice(index, 1) //using the index ,just remove the element from the element list straight away
    if (obj.size >= 3) {
        /*since we need at least 3 to win, if the no of clicked is at least 3, run..*/

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
                    document.getElementById("who-won").innerText = turn + " won the game !!!!"
                    //if equal..print out winner
                    for (var j = 0; j < remained.length; j++) {
                        remained[j].classList.remove("hover-class") //as the game is over,just remove highlight class from the unclicked boxes
                        remained[j].removeEventListener("click", getid_map) //remove eventlisteners from the unclicked boxes

                    }
                    for (id of col) {
                        document.getElementById(id).style.backgroundColor = "lightgreen" //put a green colour over winning trio boxes!!
                    }
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
            return //exit as there is no winner..!!
        } else {

            if (turn === "X") {
                /*..else if it were X's turn before, switch to "O" and display 
                								who's turn and vice versa*/
                turn = "O"
                document.getElementById("who-won").innerText = "O's Turn"
            } else if (turn === "O") {
                turn = "X"
                document.getElementById("who-won").innerText = "X's Turn"
            }
            return turn //exit function with turn variable holding current player info i.e X or O
        }

    }

    else {
        if (turn === "X") {
            /*same as above..This block runs when the number of mapped ids in 
            			obj isn't yet 3..so we just switch turns directly*/
            turn = "O"
            document.getElementById("who-won").innerText = "O's Turn"
        } else if (turn === "O") {
            turn = "X"
            document.getElementById("who-won").innerText = "X's Turn"
        }
        return turn
    }
}