import { projects } from "./portfolio";

export type Exhibit = {
  title:string; category:string; year:string; art:string; description:string; notes:string; tags:string[]; repo?:string; demo?:string;
};
export const exhibits: Exhibit[] = [
  ...projects.map(project=>project.art==='steps'?{...project,demo:'https://goparent-e474c.web.app'}:project),
  {title:'Withcenter BPO mobile application',category:'Professional commission',year:'One-month contract',art:'commission',description:'A hybrid Flutter engagement in Mandaluyong City with Withcenter Inc., Korea.',notes:'I collaborated with developers building a mobile app for a BPO company. My primary responsibilities were quality assurance and backend security features alongside Flutter development.',tags:['Flutter','Quality assurance','Backend security']},
];

type Study = {
  question:string; contribution:string; approach:string; challenge:string;
  testLabel:'Evaluation'|'Suggested verification'|'Browser verification'|'QA scope';
  testing:string; takeaway:string; outcome:string; caption:string;
  stages:[string,string,string][]; source?:string;
};
export const studies:Record<string,Study>={
  audio:{
    question:'How can someone check a speech recording for signs of synthesis?',
    contribution:'I designed and trained the hybrid WavLM–AASIST model, then connected audio uploads to a real-time detection pipeline.',
    approach:'Split the interaction into two parts. The React client handles a visitor’s recording. The Flask service runs the analysis and sends back a result.',
    challenge:'A classifier needs to pick up evidence of synthesis across different voices. Recording conditions can also change the signal it receives.',
    testLabel:'Evaluation',testing:'The capstone reports 90% classification accuracy on both its training and test datasets. A useful follow-up experiment would compare clean and noisy versions of the same recording.',
    takeaway:'A score needs its evaluation context. Accuracy on the capstone datasets answers a narrower question than performance on an unfamiliar recording.',
    outcome:'A working audio-upload pipeline connects the browser to the detector. The reported result is scoped to the capstone datasets.',
    caption:'Signal path',stages:[
      ['Capture','Audio upload','The visitor supplies a recording through the React interface. This exhibit draws a synthetic signal for exploring waveform shape.'],
      ['Process','Flask service','A REST API connects the uploaded recording to the detection pipeline. Spectrogram analysis represents changes in the signal over time.'],
      ['Classify','Hybrid detector','The WavLM–AASIST model distinguishes synthetic and human speech. Reported training and test accuracy was 90%.'],
      ['Return','Detection result','The service returns the analysis for display in the browser.']
    ],
  },
  map:{
    question:'How can a barangay resident report an issue and find out what happened next?',
    contribution:'I implemented report management, role-based access and live updates for administrative users.',
    approach:'Give residents a submission and tracking path. Give officials a shared reporting workflow so progress is recorded against the original concern.',
    challenge:'The same report serves two audiences. A resident needs visibility while an official needs authority to manage the record.',
    testLabel:'Suggested verification',testing:'Submit a sample concern as a resident. Open it as an administrator, update its status and return to the resident view. Check that a resident cannot perform the administrative action.',
    takeaway:'A useful status update keeps the connection to the original report visible across both roles.',
    outcome:'Residents can submit and monitor concerns. Officials have a centralized place to manage reports and updates.',
    caption:'Report lifecycle',stages:[
      ['Submit','Resident intake','A resident describes a barangay concern through the web application.'],
      ['Manage','Administrative view','Role-based access separates submission from report management in the MERN application.'],
      ['Track','Status follow-up','The reporting workflow keeps the concern and its progress together for follow-up.']
    ],
  },
  steps:{
    question:'How can a parent keep routines and family activities together across devices?',
    contribution:'I developed the cross-platform Flutter app and implemented creating, reading, updating and deleting family activity records.',
    approach:'Use Flutter screens for daily tasks and profiles. The public source separates the mission interface from mission logic, including completion and activity evidence.',
    challenge:'Completing a mission and attaching a photo are related actions. A photo needs to be associated with the right completed mission.',
    testLabel:'Suggested verification',testing:'Select a mission, cancel photo selection, then retry with a photo. Check that completion and the attachment refer to the same mission. Reopen the activity history and inspect the result.',
    takeaway:'When one action creates a record used by the next, the record identity matters as much as the visual success state.',
    outcome:'The app supports family schedules and tasks across Android, iOS and web. The exhibit includes two captures from its public web entry screen.',
    caption:'Mission flow',stages:[
      ['Choose','Mission screen','Mission logic can retrieve age-appropriate missions for the family profile.'],
      ['Complete','Completion record','The mission helper marks the mission complete and resolves the user-mission record.'],
      ['Attach','Photo association','The photo helper uses the completed mission reference to associate an image with the activity.']
    ],source:'lib/screens/mission_page/mission_brain.dart',
  },
  dental:{
    question:'How can a clinic view appointments and maintain their status in a desktop workflow?',
    contribution:'My portfolio includes this Visual Basic .NET clinic application. The public source documents the appointment viewer, reservations, profiles and patient-history forms.',
    approach:'Organize the desktop workflow around forms. Opening the appointment viewer retrieves appointment fields for the grid. A separate action applies a selected status.',
    challenge:'Two patients can share a name, and one patient can have multiple appointments. A status action needs to distinguish the intended visit.',
    testLabel:'Suggested verification',testing:'Use synthetic records for two appointments under the same name. Change one visit’s status, reopen the viewer and check which rows changed.',
    takeaway:'A display name helps staff find a person. A unique appointment identifier is a better boundary for a single-record update.',
    outcome:'The repository contains a desktop appointment viewer with status updates, plus separate patient and history forms.',
    caption:'Appointment viewer',stages:[
      ['Load','Read appointment fields','The form retrieves the ID, full name, status and formatted date from the appointment table.'],
      ['Select','Choose a status','The UI checks that a name and status have been selected.'],
      ['Update','Write the change','The documented update uses the selected name as its filter. This makes repeated names a valuable review case.']
    ],source:'AppointmentViewerForm.vb',
  },
  type:{
    question:'How can a visitor explore technical work while keeping a direct path to experience, links and the résumé?',
    contribution:'This portfolio brings my verified career and project material into one interactive React application.',
    approach:'Keep career and exhibit descriptions in data modules. Render the career atlas in SVG and load the physics tray and Lab as a visitor approaches them.',
    challenge:'Controls need to work on a phone and by keyboard, including when motion is reduced or an optional module is still loading.',
    testLabel:'Browser verification',testing:'Playwright exercises the map, exhibits, keyboard controls and résumé download. Responsive checks cover widths from 375 to 1920 pixels. Axe checks the loaded chapters for accessibility issues.',
    takeaway:'Treat direct links, focus order and a reduced-motion visit as first-class paths through an interactive portfolio.',
    outcome:'The static production build includes local fonts, keyboard-accessible navigation and a downloadable résumé.',
    caption:'Rendering path',stages:[
      ['Content','Typed project data','Professional records and editorial notes feed the showcase and its reading view.'],
      ['Render','React and SVG','The city, chapters and exhibition controls render in a browser without a map service.'],
      ['Load','On-demand experiments','An intersection observer loads the optional interactive exhibits near the viewport.']
    ],
  },
  commission:{
    question:'How did Flutter development, QA and backend security fit into a short team engagement?',
    contribution:'I worked with multiple developers on a BPO mobile application. My main responsibilities covered QA and backend security features alongside Flutter development.',
    approach:'The engagement was a one-month, hybrid freelance contract with Withcenter Inc., Korea, based in Mandaluyong City.',
    challenge:'The work combined three areas of responsibility within one contract. The public brief describes my role at that level.',
    testLabel:'QA scope',testing:'Quality assurance was a primary responsibility. Specific test cases, tools, defect counts and client acceptance results are outside the public account.',
    takeaway:'This engagement brought collaborative mobile development and quality assurance into the same role.',
    outcome:'A one-month freelance Flutter engagement contributing to a BPO application. The public record covers my contribution and contract scope.',
    caption:'Responsibility map',stages:[
      ['Collaborate','Flutter development','I collaborated with multiple developers on the mobile application.'],
      ['Verify','Quality assurance','QA was a primary part of my role within the development team.'],
      ['Secure','Backend security features','My contribution included backend security features. Client architecture and implementation details remain private.']
    ],
  },
};
