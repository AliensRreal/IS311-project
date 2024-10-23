let events=[
    ['ID','Name','Catgeory'],
    [1,'Food Festival','Fun'],
    [2,'COOP Metting','Educational'],
    [3,'Hackathon','Competition'],
    [4,'Python Bootcamp','Educational'],
    [5,'Food Festival','Fun'],
    [6,'COOP Metting','Educational'],
    [7,'Hackathon','Competition'],
    [8,'Python Bootcamp','Educational'],
    [9,'Food Festival','Fun'],
    [10,'COOP Metting','Educational'],
    [11,'Hackathon','Competition'],
    [12,'Python Bootcamp','Educational']
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
