function saveSettings(blacklist){var args={preferred_race:$('#preferred-race').val(),preferred_gender:$('#preferred-gender').val(),preferred_types:getSelectedTypes(),notify_newmod:$('#notify-newmod').ternary().getValue(),notify_syndication:$('#notify-syndication').ternary().getValue(),notify_reports:$('#notify-reports').ternary().getValue(),notify_updates:$('#notify-updates').ternary().getValue(),nsfw_enabled:$('#show-nsfw').ternary().getValue(),nsfl_enabled:$('#show-nsfl').ternary().getValue(),show_ratings:$('#show-ratings').ternary().getValue(),allow_ratings:$('#allow-ratings').ternary().getValue(),accepts_commissions:$('#accepts-commissions').ternary().getValue(),allow_syndication:$('#allow-syndication').ternary().getValue(),allow_report_contact:$('#allow-report-contact').ternary().getValue()};if(blacklist===true){args.blacklisted=true;}else if(blacklist===false){args.blacklisted=false;}
$.post({url:"/dashboard",data:JSON.stringify(args),contentType:'application/json'}).done((returnData)=>{if(returnData.success){showNotification({text:"Settings Saved!",fast:true,success:true});}else{showError(returnData);}}).fail((err)=>{showError(err);});}
function goToPage(number){let url='/search?author=id-'+$('#user-id').val()+'&sortby=views&sortorder=desc&page='+number;url+='&types=';let arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];url+=encodeURIComponent(arr.toString());console.log(url);window.location.href=url;}
$(document).ready(()=>{$('.settings-form .ternary-toggle').on('ternary-changed',(e,data)=>{saveAfterTimer();});var timer=null;function saveAfterTimer(){if(timer){clearTimeout(timer);}
timer=setTimeout(saveSettings.bind(null,null),1000);}
$('#personal-link').change(()=>{saveAfterTimer();});let myModsHeader=$('#my-mods-button');let myModsTabs=$('#my-mods-tabs');setupTab(myModsHeader,myModsTabs);let historyHeader=$('#history-button');let historyTabs=$('#history-tabs');setupTab(historyHeader,historyTabs);});function setupTab(topButton,innerTabList){let loaded=false;if(topButton.hasClass('active')){initialSetup();}else{topButton.on('shown.bs.tab',initialSetup);}
let anchors=$('a',innerTabList);anchors.on('shown.bs.tab',function(e){let el=$(e.delegateTarget);let id=el.data('tag');loadMyMods(id);});function initialSetup(){if(loaded)return;loaded=true;let active=$('a.active',innerTabList);let id=active.data('tag');loadMyMods(id);topButton.off('shown.bs.tab',initialSetup);}}
function loadMyMods(id){console.log("Loading Mods: "+id);let searchSettings={};let orderElem=$('#search-header-'+id+" .sort-order");let byElem=$('#search-header-'+id+" .sort-by");let pageElem=$('#search-header-'+id+" .page-number");let nameElem=$('#search-header-'+id+" .name-text");searchSettings.sort_by=byElem.val();searchSettings.sort_order=orderElem.val();searchSettings.id=id;searchSettings.page=parseInt(pageElem.val());searchSettings.name=nameElem.val();let url='/dashboard/my_mods';if(id==='contributions'){url='/dashboard/contributions';}else if(['following','hidden'].includes(id)){url='/dashboard/my_history';}else if(['viewed','downloaded'].includes(id)){url='/dashboard/action_log';}
$.ajax({url:url,type:'POST',data:JSON.stringify(searchSettings),contentType:'application/json'}).done((data)=>{let target=$('#mods-'+id+'-container');target.html(data);hideSpinner();}).fail((err)=>{console.log("Query Failure")
console.error(err);hideSpinner();});}
function onMiniSearchChanged(id){loadMyMods(id);}
function prevPage(id){let pageElem=$('#search-header-'+id+" .page-number");let pageNumDisplay=$('#search-header-'+id+" .page-number-display");let page=parseInt(pageElem.val());let newPage=page>1?page-1:page;pageElem.val(newPage);pageNumDisplay.html(newPage);loadMyMods(id);}
function nextPage(id){let pageElem=$('#search-header-'+id+" .page-number");let pageNumDisplay=$('#search-header-'+id+" .page-number-display");let page=parseInt(pageElem.val());let newPage=page+1;pageElem.val(newPage);pageNumDisplay.html(newPage);loadMyMods(id);}
function debounce(func,timeout=300){let timer;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>{func.apply(this,args);},timeout);};}
const handleSearchTextChange=debounce((a)=>onMiniSearchChanged(a));