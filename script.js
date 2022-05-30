function clicked(a){
    let item1=document.getElementById('item1');
    let oldp;
    console.log(item1.innerHTML)
    if((item1.innerHTML).includes('<div')){
        let div_i=(item1.innerHTML).indexOf('<br>')
        oldp=(item1.innerHTML).slice(div_i+4,)
    }
    else{
        oldp=item1.innerHTML;
    }
    
    let operator=['+','×','÷','-','%','1/x','**','√'];
    if(['1','2','3','4','5','6','7','8','9','√','(',')'].includes(a) && item1.innerHTML=='<p>0</p>'){
        item1.innerHTML=`<p>${a}</p>`;
    }   
    else if(operator.filter(op=>oldp.replace(/<\/?[^>]+(>|$)/g,"").endsWith(op)).length>0
    && operator.includes(a)) {
        return;
    }
    else if(a=='1/x'){
        let k=oldp.slice(3,oldp.length-4);
        let co=k
        operator.forEach(op=>{
            co = co.replaceAll(op,' ');
        });
        co=co.split(' ');
        let newr=((oldp.slice(3,oldp.length-4)).length)-(co[co.length-1].length)
        let opr=k[k.length-co[co.length-1].length-1];
        
        if(co[co.length-1].includes(')')){
            let chhello=eval(`1/(${opr+co[co.length-1]}`);
            item1.innerHTML=`<p>${oldp.slice(3,newr+2)+chhello})</p>`;
        }
        else{
            item1.innerHTML=`<p>${oldp.slice(3,newr+3)+(1/(co[co.length-1])).toFixed(3)}</p>`;
        }
    }
    else if(a=='+/-'){
        if(item1.innerHTML=='<p>0</p>'){
            return;
        }
        let k=oldp.slice(3,oldp.length-4);
        let co=k
        operator.forEach(op=>{
            co = co.replaceAll(op,' ');
        });
        co=co.split(' ');
        let newr=((oldp.slice(3,oldp.length-4)).length)-(co[co.length-1].length);
        let opr=k[(k.length-co[co.length-1].length)-1];
        //4*5+(-(-2))
        // let chhello=eval(`(${opr+co[co.length-1]})`);
        if(co[co.length-1].includes(')')){
            item1.innerHTML=`<p>${oldp.slice(3,newr+3)}(${opr+co[co.length-1]})</p>`;
        }
        else{
            item1.innerHTML=`<p>${oldp.slice(3,newr+3)}(${(-(co[co.length-1]))})</p>`;
        }
    }
    else if(a=='='){
        let result=calculate(oldp.slice(3,oldp.length-4));
        item1.innerHTML=`<div class="result" style="color:grey">${oldp.slice(3,oldp.length-4)}</div><br><p>${result}</p>`;
    }
    else if(a=='←' && item1.innerHTML!='<p>0</p>'){
        let k=oldp.slice(3,oldp.length-5);
        item1.innerHTML=`<p>${k}</p>`;
        if(item1.innerHTML=='<p></p>'){
            item1.innerHTML='<p>0</p>'
        }    
    }
    else if((a=='C' || a=='CE') && item1.innerHTML!='<p>0</p>'){
        item1.innerHTML='<p>0</p>';
    }
    else if((a=='←' || a=='C') && item1.innerHTML=='<p>0</p>'){
        item1.innerHTML=oldp;
    }
    else if(['M+','M-','MS','CE','MR'].includes(a)){
        item1.innerHTML=oldp;
    }

    else{
        console.log(oldp)
        let k=(oldp.slice(3,oldp.length-4))+a;
        item1.innerHTML=`<p>${k}</p>`;
    }
    
}
function calculate(disp_string){
    disp_string=disp_string.replace('×','*');
    disp_string=disp_string.replace('÷','/');
    disp_string=disp_string.replace('√','Math.sqrt');
   return eval(disp_string);
}