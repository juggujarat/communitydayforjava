import { A } from '../lib/assets'
import { SocialLink, type Social } from '../lib/icons'

interface Volunteer {
  name: string; role?: string; org?: string; img: string; bg: string; pos: string; zoom?: boolean; scale?: number; origin?: string; socials: Social[]
}

const li = (name: string, href: string): Social => ({ type: 'linkedin', href, label: `${name} on LinkedIn` })
const ig = (name: string, href: string): Social => ({ type: 'instagram', href, label: `${name} on Instagram` })
const gh = (name: string, href: string): Social => ({ type: 'github', href, label: `${name} on GitHub` })

const VOLUNTEERS: Volunteer[] = [
  { name: 'Daman Singh Rajput', role: 'Java FullStack Developer', org: 'Techxplore', img: A['8431f54c-7088-4c9e-8d84-5cf02d90f8ad'], bg: '#FF384B', pos: '50% 18%', socials: [li('Daman Singh Rajput', 'https://in.linkedin.com/in/daman-singh-rajput-2a1ba4237')] },
  { name: 'Vinay Rajput', role: 'Sr. Visual Designer', org: 'Apexure India', img: A['2edee5be-2908-4001-80aa-7e789fe6554f'], bg: '#7D00BC', pos: '50% 20%', socials: [li('Vinay Rajput', '#')] },
  { name: 'Jayesh Gupta', role: 'Software Engineer', org: 'Tata Consultancy Services  ', img: A['9bbc223f-9f21-49aa-af66-23ac8226e948'], bg: '#FEC400', pos: '50% 6%', zoom: true, socials: [li('Jayesh Gupta', 'https://in.linkedin.com/in/jayeshgupta91')] },
  { name: 'Nagendra Verma', role: 'Java FullStack Developer', org: 'Techxplore', img: A['09610378-4035-4348-aa57-10b677b7eb0f'], bg: '#7D00BC', pos: '50% 18%', socials: [li('Nagendra Verma', 'https://linkedin.com/in/nagendra-verma-8a60372b2/'), ig('Nagendra Verma', 'https://www.instagram.com/nagendrayounger')] },
  { name: 'Smit Joshi', role: 'ASE @ Advenix Systems LLP', org: 'Advenix Systems LLP', img: A['6fedc772-7fb3-4c46-996f-3fc8065fb6fc'], bg: '#0D5CDB', pos: '50% 10%', socials: [li('Smit Joshi', 'https://www.linkedin.com/in/smit-joshi814'), gh('Smit Joshi', 'https://github.com/smit-joshi814')] },
  { name: 'Malhar Gupte', role: 'AI Data Engineer', org: 'ProductSquads', img: A['4bbd6e58-8d6f-4db9-8a4c-9827262260fd'], bg: '#02CF70', pos: '50% 8%', socials: [li('Malhar Gupte', 'https://www.linkedin.com/in/malhargupte/')] },
  { name: 'Harshvardhan Parmar', role: "LFX'25 Mentee", org: 'Microcks', img: A['0b80d07f-cdc9-45ab-a226-7bfd34ce3991'], bg: '#FEC400', pos: '50% 14%', socials: [li('Harshvardhan Parmar', 'https://www.linkedin.com/in/harshvardhan-parmar')] },
  // was: socials: [] — LinkedIn icon added for alignment; replace '#' with the real profile URL
  { name: 'Deep Shah', role: 'Java FullStack Developer', org: 'Techxplore', img: '/assets/deep-shah-photo.png', bg: '#FF384B', pos: '50% 12%', socials: [li('Deep Shah', 'https://www.linkedin.com/in/deepshah-java-developer'), ig('Deep Shah', 'https://www.instagram.com/iamdeepshah16')] },
  { name: 'Divyesh Prajapati', role: 'Java Technical Lead', org: 'Tata Consultancy Services', img: '/assets/divyesh-prajapati.webp', bg: '#0D5CDB', pos: '50% 0%', scale: 1.8, origin: 'center top', socials: [li('Divyesh Prajapati', 'https://www.linkedin.com/in/divyeshprajapati1010/')] },
  { name: 'Tanvir Dhanani', role: 'Backend Developer', org: 'IBM', img: '/assets/dhanani-tanvir.webp', bg: '#02CF70', pos: '50% 22%', scale: 1.9, origin: 'center center', socials: [li('Dhanani Tanvir', 'https://www.linkedin.com/in/tanvirdhanani')] },
  { name: 'Harshit Gajjar', role: 'Content Creator', org: 'Freelancer', img: '/assets/harshit-gajjar.webp', bg: '#FEC400', pos: '50% 50%', socials: [li('Harshit Gajjar', 'https://www.linkedin.com/in/harshit-gajjar-79b51a296/')] },
  { name: 'Ashish Vaghela', role: 'Frontend Developer', org: 'Nelkinda Software Craft', img: '/assets/volunteer-ashish-vaghela-brand.jpg', bg: '#FF384B', pos: '50% 14%', socials: [li('Ashish Vaghela', 'https://linkedin.com/in/ashish-codejourney'), ig('Ashish Vaghela', 'https://instagram.com/heyyy_ashish')] },
  { name: 'Romin Kevadiya', role: 'Student', org: 'LJIET', img: '/assets/volunteer-romin-kevadiya-brand.jpg', bg: '#0D5CDB', pos: '50% 14%', socials: [li('Romin Kevadiya', 'https://linkedin.com/in/rominkevadiya'), ig('Romin Kevadiya', 'https://www.instagram.com/rominkevadiya/')] },
  { name: 'Margi Shah', role: 'Java Developer', org: 'IBM', img: '/assets/volunteer-margi-shah-brand.jpg', bg: '#02CF70', pos: '50% 14%', socials: [li('Margi Shah', 'https://www.linkedin.com/in/margi212'), ig('Margi Shah', 'https://www.instagram.com/margi.212')] },
  { name: 'Ankit Dabhi', role: 'Frontend Developer', org: 'Prama.ai', img: '/assets/volunteer-ankit-dabhi-brand.jpg', bg: '#FEC400', pos: '50% 14%', zoom: true, socials: [li('Ankit Dabhi', 'https://www.linkedin.com/in/theankitdabhi'), ig('Ankit Dabhi', 'https://www.instagram.com/theankitdabhi')] },
  { name: 'Krunal Pandit', role: 'Developer', org: 'IBM India Pvt Ltd', img: '/assets/volunteer-krunal-pandit-brand.jpg', bg: '#7D00BC', pos: '50% 14%', socials: [li('Krunal Pandit', 'https://www.linkedin.com/in/krunal-pandit-46920469'), ig('Krunal Pandit', 'https://www.instagram.com/krunal_pandit')] },
  { name: 'Ketan Bhavsar', role: 'Developer', org: 'Staunchsys', img: '/assets/volunteer-ketan-bhavsar-brand.jpg', bg: '#0D5CDB', pos: '50% 14%', socials: [li('Ketan Bhavsar', 'https://www.linkedin.com/in/ketanbhavsar')] },
  { name: 'Ishank Gupta', role: 'Developer', org: 'Avaloq', img: '/assets/volunteer-ishank-gupta-brand.jpg', bg: '#02CF70', pos: '50% 14%', socials: [li('Ishank Gupta', 'https://www.linkedin.com/in/ishankguptag/'), ig('Ishank Gupta', 'https://www.instagram.com/repeat.by.design')] },
  { name: 'Shrujal Ganatra', role: 'Student', org: 'AD Patel Institute of Technology', img: '/assets/shrujal.jpeg', bg: '#FF384B', pos: '50% 14%', socials: [li('Shrujal Ganatra', 'https://www.linkedin.com/in/shrujal-ganatra/'), ig('Shrujal Ganatra', 'https://www.instagram.com/shrujal.dev')] },
  { name: 'Ved Vyas', role: 'Student', org: 'GSFC University', img: '/assets/volunteer-ved-vyas-brand.jpg', bg: '#FEC400', pos: '50% 14%', socials: [li('Ved Vyas', 'https://www.linkedin.com/in/ved-vyas416631327'), ig('Ved Vyas', 'https://www.instagram.com/vedvyas58921')] },
  { name: 'Divya Trivedi', role: 'Developer', org: 'Thomson Reuters', img: '/assets/volunteer-divya-trivedi-brand.jpg', bg: '#7D00BC', pos: '50% 14%', socials: [li('Divya Trivedi', 'https://www.linkedin.com/in/divya-trivedi-8177b0165'), ig('Divya Trivedi', 'https://www.instagram.com/divya_trivedi__')] },
  { name: 'Aditya Lallchandani', role: 'Student', org: 'Nirma University', img: '/assets/volunteer-aditya-lallchandani-brand.jpg', bg: '#0D5CDB', pos: '50% 14%', socials: [li('Aditya Lallchandani', 'https://www.linkedin.com/in/adityalallchandani/'), ig('Aditya Lallchandani', 'https://www.instagram.com/adityalallchandani/')] },
  { name: 'Dhruvi Jha', role: 'Developer', org: 'Agileverify', img: '/assets/volunteer-dhruvi-jha-brand.jpg', bg: '#02CF70', pos: '50% 14%', socials: [li('Dhruvi Jha', 'https://www.linkedin.com/in/dhruvi-jha/'), ig('Dhruvi Jha', 'https://www.instagram.com/_dhrruvvii_/')] },
  { name: 'Harsh Patel', role: 'Student', org: 'DevIT', img: '/assets/harsh.jpeg', bg: '#FF384B', pos: '50% 14%', socials: [li('Harsh Patel', 'https://www.linkedin.com/in/harsh-patel-2137b5237'), ig('Harsh Patel', 'https://www.instagram.com/hnp_patel')] },
  { name: 'Hemangini B Thakkar', role: 'Developer', org: 'Monarch Innovation Pvt Ltd', img: '/assets/volunteer-hemangini-thakkar-brand.jpg', bg: '#7D00BC', pos: '50% 14%', socials: [li('Hemangini B Thakkar', 'https://www.linkedin.com/in/hemangini-thakkar-724115245/'), ig('Hemangini B Thakkar', 'https://www.instagram.com/hemangini_54')] },
  { name: 'Riyanshi Chaudhary', role: 'Student', org: 'Student', img: '/assets/volunteer-riyanshi-chaudhary-brand.jpg', bg: '#0D5CDB', pos: '50% 14%', socials: [li('Riyanshi Chaudhary', 'https://www.linkedin.com/in/riyanshi-chaudhary-ab842731b'), ig('Riyanshi Chaudhary', 'https://www.instagram.com/riyanshi.1806')] },
  { name: 'Dwij Pancholi', role: 'Student', org: 'SAL Institute of Technology and Engineering Research', img: '/assets/dwij.png', bg: '#FEC400', pos: '50% 14%', socials: [li('Dwij Pancholi', 'https://www.linkedin.com/in/dwijpancholi'), ig('Dwij Pancholi', 'https://www.instagram.com/dwij._.25')] },
  { name: 'Nirva Padaliya', role: 'Cloud Engineer', org: 'Hackberry Softech Private Limited', img: '/assets/volunteer-nirva-padaliya.png', bg: '#7D00BC', pos: '50% 14%', socials: [li('Nirva Padaliya', 'https://www.linkedin.com/in/nirva-padaliya'), { type: 'x', href: 'https://x.com/nirva_45', label: 'Nirva Padaliya on X' }, ig('Nirva Padaliya', 'https://www.instagram.com/nirva_45')] },
  { name: 'Vanshika Kamdar', role: 'Student', org: 'TechnoSpace Institute', img: '/assets/volunteer-vanshika-kamdar.png', bg: '#FF384B', pos: '50% 100%', zoom: true, origin: 'center top', socials: [li('Vanshika Kamdar', 'https://www.linkedin.com/in/vanshikakamdar/'), { type: 'x', href: 'https://x.com/vanshika_kamdar', label: 'Vanshika Kamdar on X' }, ig('Vanshika Kamdar', 'https://www.instagram.com/vanshika_kamdar_/')] },
  { name: 'Prajesh Kapadiya', role: 'Sr UI Developer', org: 'Tatvasoft', img: '/assets/prajesh1.jpeg', bg: '#0D5CDB', pos: '50% 0%', scale: 1.2, socials: [li('Prajesh Kapadiya', 'https://www.linkedin.com/in/prajesh-kapadiya-600121142')] },
]

/** Volunteers & organisers (#volunteers). */
export default function Volunteers() {
  return (
    <section id="volunteers" style={{ position: 'relative', padding: '72px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 72%)', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '14%', right: '8%', width: '30px', height: '30px', borderRadius: '50%', background: '#02CF70', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.7 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Volunteers &amp; <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>organisers</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '100%', fontSize: '18px', fontWeight: 500, color: '#a8b0e0', textAlign: 'center' }}>Community Day for Java runs on the energy of volunteers who make the day happen.</p>
        </div>
        <div id="volunteers-grid" data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px, 1fr))', gap: '34px 24px', maxWidth: '1080px', margin: '0 auto' }}>
          {VOLUNTEERS.map((v, i) => (
            <div key={i} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ aspectRatio: '1', margin: '0 auto 16px', width: '100%', borderRadius: '22px', overflow: 'hidden', background: v.bg, boxShadow: '0 16px 34px rgba(0,0,0,.34)', position: 'relative' }}>
                <img src={v.img} alt={v.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos, display: 'block', ...((v.scale ?? (v.zoom ? 1.45 : 1)) !== 1 ? { transform: `scale(${v.scale ?? 1.45})`, transformOrigin: v.origin ?? 'center top' } : {}) }} />
                {v.socials.some((s) => s.type === 'linkedin' || s.type === 'instagram') && (
                  <div style={{ position: 'absolute', left: '12px', bottom: '12px', zIndex: 2, display: 'flex', gap: '8px' }}>
                    {v.socials.filter((s) => s.type === 'linkedin' || s.type === 'instagram').map((social) => <SocialLink key={social.type} social={social} variant="dark" />)}
                  </div>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>{v.name}</div>
              {v.role && <div style={{ fontSize: '13px', color: '#9aa3d6', marginTop: '4px' }}>{v.role}</div>}
              {v.org && <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FEC400', marginTop: '5px' }}>{v.org}</div>}
              {/* {v.socials.length > 0 && <SocialRow socials={v.socials} variant="dark" />} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
