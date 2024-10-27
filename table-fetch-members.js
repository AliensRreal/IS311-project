let events=[
    ['ID','Name','Role'],
    [1,'Anmar','Admin'],
    [2,'Wafi','Admin'],
    [3,'MOE','Admin'],
    [4,'Anyone','UI'],
    [5,'Anmar','Event Managment'],
    [6,'Wafi','UI'],
    [7,'MOE','Finance'],
    [8,'Anyone','Finance'],
    [9,'Anmar','Design'],
    [10,'Wafi','Design'],
    [11,'MOE','Photography'],
    [12,'Anyone','Finance']
]

createTable(events);




function createTable(arr){
    let holder= document.getElementById("table-holder");
    let inner='<table id="table">'
    for(let i=0;i<arr.length;i++){
        inner+='<tr>';
        for(let y=0;y<arr[i].length;y++){
            if(i===0){
                inner+='<th>'+arr[i][y]+'</th>';
            }
            else 
            inner+='<td>'+arr[i][y]+'</td>';
        }
        inner+='</tr>';
       
    }
    inner+='</table>';
    holder.innerHTML=inner;
    let table=document.getElementById("table")
    table.classList.add("table");
    table.classList.add("table-striped");
    table.classList.add("table-hover");

}
