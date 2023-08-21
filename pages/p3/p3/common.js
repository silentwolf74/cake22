var spinnerCount=0;$.fn.enterKey=function(fnc){return this.each(function(){$(this).keypress(function(ev){var keycode=(ev.keyCode?ev.keyCode:ev.which);if(keycode=='13'){fnc.call(this,ev);}})})}
trunc=function trunc(string,length){if(!string){return '';}
if(string.length>length){return string.substring(0,length-3)+'...';}
return string;}
function showError(title,err){hideSpinner();var text='';if(!err){err=title;title='An Error Occurred';}
if(typeof(err)=='object'){if(err.text&&err.title){title=err.title;text=err.text;}else if(err.error&&err.error.title&&err.error.text){text=err.error.text;title=err.error.title;}else{text=JSON.stringify(err);}}else{text=err;}
$('#error-modal-title').text(title);$('#error-modal-text').text(typeof(text)=='object'?JSON.stringify(text):text);$('#error-modal').modal();}
function showSpinner(){spinnerCount++;$('#spinner').show();}
function hideSpinner(clearAll){spinnerCount--;if(clearAll){spinnerCount=0;}
if(spinnerCount<0){spinnerCount=0;}
if(spinnerCount<=0){$('#spinner').hide();}}
function removeNotifyQueryParameter(){if((!history)||(!history.replaceState)){return;}
history.replaceState(null,"",removeURLParameter(location.href,'notification'));}
function removeURLParameter(url,parameter){var urlparts=url.split('?');if(urlparts.length>=2){var prefix=encodeURIComponent(parameter)+'=';var pars=urlparts[1].split(/[&;]/g);for(var i=pars.length;i-->0;){if(pars[i].lastIndexOf(prefix,0)!==-1){pars.splice(i,1);}}
return urlparts[0]+(pars.length>0?'?'+pars.join('&'):'');}
return url;}
function handleQueryNotification(){const params=new URLSearchParams(window.location.search);var notification=params.get('notification');showNotification(notification);removeNotifyQueryParameter();}
var commonNotifications={modSaved:{text:'Mod/Draft saved successfully.'},settingsSaved:{text:'Settings saved successfully.'},modDeleted:{text:'Mod/Draft deleted successfully.'},};var notificationQueue=[];function showNotification(notification){if(!notification){return;}
if(typeof(notification)=='string'){var n=commonNotifications[notification];notification=n||{text:notification};}
notificationQueue.push(notification);showNextNotification(notification);}
function showNextNotification(){var activeNotification=$('.user-notification').length>0;if(activeNotification||notificationQueue.length<=0){return;}
var notification=notificationQueue.shift();var elem=$(document.createElement('div'));elem.addClass('alert user-notification custom-fade text-center');if(notification.error){elem.addClass('alert-danger');}else if(notification.success){elem.addClass('alert-success');notification.text='<i class="fa fa-check"></i> '+notification.text}else{elem.addClass('alert-primary');}
elem.html(notification.text);$('body').append(elem);var fadeTime=300;var displayTime=3000;if(notification.fast){displayTime=1000;}
setTimeout(()=>{elem.addClass('in');},fadeTime);setTimeout(()=>{elem.removeClass('in');},fadeTime+displayTime);setTimeout(()=>{elem.remove();showNextNotification();},fadeTime+displayTime+fadeTime);}
var _LAST_UNIQUE_ID=0;function getNextUniqueId(){_LAST_UNIQUE_ID++;let val='unique_id_'+_LAST_UNIQUE_ID;return val;}
function createProgressbar(id,value,message){if(!id){id=getNextUniqueId();}
if(!value){value=0;}
if(!message){message=value+'%';}
let parent=$('#progress-bar-block');let bar=$(document.createElement('DIV'));bar.attr('id','progress-parent-'+id);bar.addClass('progress');let inner=$(document.createElement('DIV'));inner.attr('id','progress-inner-'+id);inner.addClass('progress-bar');inner.attr('role','progressbar');inner.attr('aria-valuenow',value);inner.attr('aria-valuemin',0);inner.attr('aria-valuemax',100);inner.css('width',value+'%');inner.text(message);if(value<0){inner.addClass('progress-bar-striped');inner.addClass('progress-bar-animated');inner.css('width','100%');inner.attr('aria-valuenow',100);}
bar.append(inner);parent.append(bar);return id;}
function updateProgressBar(id,value,message){if(!message){message=value+'%';}else{message=message+" : "+value+"%";}
let inner=$('#progress-inner-'+id);if(value>=0){inner.attr('aria-valuenow',value);inner.css('width',value+'%');}
if(value>=100){inner.addClass('bg-success');}
inner.text(message);if(value>=100){setTimeout(clearProgressBar.bind(null,id),2000);}}
function errorProgressBar(id,error){let inner=$('#progress-inner-'+id);inner.addClass('bg-danger');inner.attr('aria-valuenow',100);inner.css('width','100%');inner.text(error);setTimeout(clearProgressBar.bind(null,id),5000);}
function clearProgressBar(id){let bar=$('#progress-parent-'+id);bar.fadeOut("slow",()=>{bar.remove();})}
$(document).ready(()=>{$('.server-date').each((idx,val)=>{var elem=$(val);var dt=new Date(elem.text());console.log("Formatted date: "+elem.text());elem.text(dt.toLocaleString());});var hash=window.location.hash;var elem=$(hash+'.tab-pane');var tabs=[];while(elem.length>0){var id=elem.attr('id');var toAdd=$('a[href$="#'+id+'"].nav-link')
tabs.unshift(toAdd);elem=elem.parent().closest('.tab-pane');}
for(var idx in tabs){tabs[idx].tab('show');}
$('a.nav-link').click(function(e){if($(this).data('toggle')==='tab'){e.preventDefault();var scrollmem=$('body').scrollTop()||$('html').scrollTop();window.location.hash=this.hash;$('html,body').scrollTop(scrollmem);$(this).tab('show');}});let carouselElements=$('.glide');$.each(carouselElements,(index,element)=>{if(!$(element).hasClass('no-auto-setup')){let glide=new Glide(element,{type:'carousel',startAt:0,}).mount();}});$(function(){$('[data-toggle="tooltip"]').tooltip()});if(typeof(_STARTPOS)==='string'){let offset=$(_STARTPOS).offset();document.body.scrollTop=offset.top;document.documentElement.scrollTop=offset.top;}});