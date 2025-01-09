import { twMerge } from "tailwind-merge"
import { easeInOut, motion } from "framer-motion"
const testimonials=[
    {
        text:"The user experience is phenomenal, and the support team is alway there to help. Highly recommended",
   name:'Erica Wyatt',
   title:'Product Manager - BlockLink',
   avatarImage:'/assets/images/avatar-erica-wyatt.jpg',
},
    {   text:"Our Productivity has skyrocketed since we started using Blockforge It\'s a game changer for us.",
        name:'Noel Baldwin',
        title:'Lead Developer - BitBridge',
        avatarImage:'/assets/images/avatar-noel-baldwin.jpg',

    },
    {
        text:"The integration process was seamless, and the performmance improvement are beyond our expectataions",
        name:'Harry Bender',
        title:'CTO - CryptoSolutions',
        avatarImage:'/assets/images/avatar-harry-bender.jpg',

    }
]
export const TestimonialsSection=()=>{
    return <section className="py-32 bg-zinc-800 ">
        <div className="container">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 lg:gap-12">
{testimonials.map((testimonials, testimonialIndex)=>(
    
        <motion.blockquote key={testimonialIndex}
        initial={{
            opacity:0,
            y:24
        }}
        whileInView={{
            opacity:1,
            y:0,
        }}
        viewport={{
            once:true,
        }}
        transition={{
            delay: testimonialIndex * 0.5,
            ease: 'easeInOut',
            duration: 1,
        }}
        className={twMerge(testimonialIndex === 2 && "md:hidden lg:block")}
        >
            <p className="font-heading text-3xl lg:text-4xl font-black">&ldquo;{testimonials.text}&rdquo;</p>
            <cite className="mt-8 block">
<div className="flex gap-3 items-center">
    <div>
        <div className="size-16 bg-zinc-700 rounded-full bg-cover" style={{
            backgroundImage:`url(${testimonials.avatarImage})`
        }}>
            
        </div>
    </div>
    <div>
        <div className="text-lg not-italic font-black">
{testimonials.name}
        </div>
        <div className="text-zinc-400 not-italic">
{testimonials.title}
        </div>
    </div>
</div>
            </cite>
        </motion.blockquote>
    
))}    
</div> 
</div>       
    </section>
}