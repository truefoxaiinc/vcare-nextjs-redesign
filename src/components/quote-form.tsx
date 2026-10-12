'use client';
import { FormEvent, useState } from 'react';

export function QuoteForm({prefill=''}:{prefill?:string}) {
 const [opened,setOpened]=useState(false);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=new FormData(e.currentTarget);const subject=encodeURIComponent('Flooring project quote request');const body=encodeURIComponent([
  'Hello Vcare team,','',
  'Name: '+form.get('name'),'Email: '+form.get('email'),'Phone: '+form.get('phone'),
  'Project type: '+form.get('projectType'),'Room(s): '+form.get('rooms'),'Approximate area: '+form.get('area')+' sq. ft.',
  'Preferred floor: '+form.get('product'),'Timeline: '+form.get('timeline'),'Budget: '+form.get('budget'),'',
  'Project details: '+form.get('details')
 ].join('\n'));window.location.href='mailto:sales@vcarehardwoodfloors.ca?subject='+subject+'&body='+body;setOpened(true)}
 return <form onSubmit={submit}><div className="form-fields">
  <label className="field">Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label>
  <label className="field">Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label>
  <label className="field">Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="647 000 0000"/></label>
  <label className="field">What do you need?<select name="projectType" defaultValue=""><option value="" disabled>Choose one</option><option>Flooring supply</option><option>Supply and installation</option><option>Installation support</option><option>I&apos;m still exploring</option></select></label>
  <label className="field">Room(s)<input name="rooms" placeholder="Living room, kitchen…"/></label>
  <label className="field">Approximate size<input name="area" type="number" min="0" placeholder="Square feet"/></label>
  <label className="field">Floor you&#39;re interested in<input name="product" defaultValue={prefill} placeholder="Hardwood, laminate, vinyl…"/></label>
  <label className="field">When are you hoping to start?<select name="timeline" defaultValue=""><option value="">Select timing</option><option>As soon as possible</option><option>Within 1–3 months</option><option>Later this year</option><option>Just planning ahead</option></select></label>
  <label className="field full">Anything else we should know?<textarea name="details" placeholder="Share a little about your project, style or questions…"/></label>
  <div className="field full"><button className="button button-primary" type="submit">Prepare my quote request <span>↗</span></button><span style={{fontSize:10,color:'#77736e'}}>Your email app will open with your project details ready to send.</span></div>
 </div>{opened&&<div className="success-message" role="status">Your email app should open with the request. If it did not, email <a href="mailto:sales@vcarehardwoodfloors.ca">sales@vcarehardwoodfloors.ca</a> or call 647 391 4283.</div>}</form>;
}
