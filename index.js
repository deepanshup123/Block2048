// select Main Div Using Container Class to append their sub child div

let container = document.getElementById("container");
let lose_text = document.getElementById('lose');

let box_tiles = [
    [2, 4, 16, 64, 32],
    [8, 2, 1024, 2048, 8],
    [32, 8, 16, 4, 2],
    [256, 64, 512, 128, 32],
    [2048, 256, 1024, 2, 8]
]

function Tiles_Main(){
for (let i = 0; i < box_tiles.length; i++) {
    for (let j = 0; j < box_tiles[i].length; j++) {
        // Creating the Div Element for the main Div
        let Child_Div = document.createElement('div');
        Child_Div.classList.add("sub_container");
        container.appendChild(Child_Div);
        Child_Div.innerText = box_tiles[i][j];

        switch(box_tiles[i][j]){
            case 0:
                Child_Div.classList.add('child_div_0');
                break;
            case 2:
                Child_Div.classList.add('child_div_2');
                break;
            case 4:
                Child_Div.classList.add('child_div_4');
                break;
            case 8:
                Child_Div.classList.add('child_div_8');
                break;
            case 16:
                Child_Div.classList.add('child_div_16');
                break;
            case 32:
                Child_Div.classList.add('child_div_32');
                break;
            case 64:
                Child_Div.classList.add('child_div_64');
                break;
            case 128:
                Child_Div.classList.add('child_div_128');
                break;
            case 256:
                Child_Div.classList.add('child_div_256');
                break;
            case 512:
                Child_Div.classList.add('child_div_512');
                break;
            case 1024:
                Child_Div.classList.add('child_div_1024');
                break;
            case 2048:
                Child_Div.classList.add('child_div_2048');
                break;            
        }
    }
}
}

let result = []
Tiles_Main()

// Arrow left pressed then storing value and for that declare all type
let left_array = [];
let first_array;
let second_array;
let third_array;
let fourth_array;
let fifth_array;
let generate_places = [];

let removeZero = (num) => num > 0;

function Move(take_main_array){
    for (let i = 0; i < take_main_array.length; i++) {
        for (let j = 0; j < take_main_array[i].length; j++) {
            left_array.push(take_main_array[i][j])
            first_array = left_array.slice(0, 5)
            second_array = left_array.slice(5, 10)
            third_array = left_array.slice(10, 15)
            fourth_array = left_array.slice(15, 20)
            fifth_array = left_array.slice(20, 25)
        }
    }
}

// For removing Zero or Blank spaces from Array
function Array_Remove_Zero(Array_for){
    for (let i = 0; i < Array_for.length; i++) {
        let store = Array_for[i].filter(removeZero);
        result.push(store)
    }
}

// reversing the array element of nested to move forward
function reverse_result(){
    for (let r_r = 0; r_r < result.length; r_r++) {
        result[r_r].reverse();
    }
}

// ater slide Add a matching number
function Add_Number(){
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if(result[i][j] == result[i][j+1]){
                result[i][j] += result[i][j+1];
                result[i].splice(j+1, 1)
            }
        }
    }
    let selection_zero = document.getElementsByClassName('child_div_0')
    if (selection_zero.length == 0) {
        let lose = document.getElementsByClassName('sub_container');
        for (let i = 0; i < 25; i++) {
            lose[0].remove();
        }
        lose_text.style.display = "block"
    }
}

// for add Zero to maintane the array length
function Add_Zero(){
    for (let i = 0; i < result.length; i++) {
        let position = [];
        if(result[i].length < 5){
            for (let j = result[i].length; result[i].length < 5; j++) {
                result[i].push(0);
                position.push(i, j);
                generate_places.push(position);
                position = [];
            }
            
        }
    }
    
    let max = generate_places.length;
    let random = Math.floor(Math.random() * max);
    let received_position = generate_places[random];
    result[received_position[0]][received_position[1]] = 2;
    max;
    random;
    received_position;
    generate_places = [];
}

function Add_zero_reverse(){
    for (let i = 0; i < result.length; i++) {
        let position = [];
        if(result[i].length < 5){
            for (let j = result[i].length; result[i].length < 5; j++) {
                result[i].push(0);
                position.push(i, j);
                generate_places.push(position);
                position = [];
            }
            
        }

    }
    
    let max = generate_places.length;
    let random = Math.floor(Math.random() * max);
    let received_position = generate_places[random];
    result[received_position[0]][received_position[1]] = 2;
    max;
    random;
    received_position;

    generate_places = [];
}
// convert zero to empty
function Zero_Blank(){
    let blank_zero = document.getElementsByClassName('child_div_0');
    for (let i = 0; i < blank_zero.length; i++) {
        blank_zero[i].innerHTML = "";
    }
}
Zero_Blank()

// fiNAL PROCESS to remove then update the box tiles and remainig reset some 
function Remove_Update_Release(){
    let sub_div = document.getElementsByClassName('sub_container');
    
    for (let sub = 0; sub < 25; sub++) {
        sub_div[0].remove();
    }
    box_tiles = result;
    
    Tiles_Main()
    result = [];
    left_array = [];
}

function Movement(key_value){
    if (key_value.key == "ArrowLeft") {
        // console.log(key_value.key);
        
        Move(box_tiles);
        let left_array_update = [first_array, second_array, third_array, fourth_array, fifth_array];
        
        Array_Remove_Zero(left_array_update);
        // for adding element when its press left
        Add_Number();

        // console.log(result[0])
        Add_Zero();
        Remove_Update_Release();
        Zero_Blank();
    }
    else if(key_value.key == "ArrowRight"){
        Move(box_tiles);
        let right_array_update = [first_array, second_array, third_array, fourth_array, fifth_array];
        Array_Remove_Zero(right_array_update);
        reverse_result();
        Add_Number();
        Add_zero_reverse();
        reverse_result();
        Remove_Update_Release();
        Zero_Blank();

    }else if(key_value.key == "ArrowUp"){
        let array_vertical_down =[];
        let array_2= [];
        let nested_array = [];
        for (let i = 0; i < box_tiles.length; i++) {
            for (let j = 0; j < box_tiles.length; j++) {
                nested_array.push(box_tiles[j][i]);
            }
            array_vertical_down.push(nested_array);
            nested_array = []
            
        }
        Move(array_vertical_down);
        let down_array_update = [first_array, second_array, third_array, fourth_array, fifth_array]
        Array_Remove_Zero(down_array_update);
        Add_Number();
        Add_Zero();
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                nested_array.push(result[j][i]);
            }
            array_2.push(nested_array);
            nested_array = []
            
        }
        result = array_2;
        array_2 = [];
        Remove_Update_Release()
        Zero_Blank();
        array_vertical_down = [];
    }
    else if(key_value.key == "ArrowDown"){
        let array_vertical_up =[];
        let array_up= [];
        let nested_array = [];
        for (let i = 0; i < box_tiles.length; i++) {
            for (let j = 0; j < box_tiles.length; j++) {
                nested_array.push(box_tiles[j][i]);
        
            }
            array_vertical_up.push(nested_array);
            nested_array = []
            
        }
        Move(array_vertical_up);
        let up_array_update = [first_array, second_array, third_array, fourth_array, fifth_array]
        Array_Remove_Zero(up_array_update);
        reverse_result();
        Add_Number();
        Add_zero_reverse()
        reverse_result();
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                nested_array.push(result[j][i]);
        
            }
            array_up.push(nested_array);
            nested_array = []
            
        }
        result = array_up;
        array_up = [];
        Remove_Update_Release();
        Zero_Blank();
        array_vertical_up = [];
    }
}

document.addEventListener("keydown", Movement);
let btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    box_tiles = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    lose_text.style.display = 'none';
    result = [];
    left_array= [];
    Tiles_Main();
    Zero_Blank();
})
