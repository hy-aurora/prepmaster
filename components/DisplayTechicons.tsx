import { getTechLogos } from '@/lib/utils';
import React from 'react'
import Image from 'next/image';
const DisplayTechicons = async ({techStack}:TechIconProps) =>  {
  const techIcons = await getTechLogos(techStack);
  function cn(...classes: (string | boolean)[]): string {
    return classes.filter(c => typeof c === 'string' && c).join(' ');
  }

  return (
    <div className='flex flex-row'>
      {techIcons.map(({tech, url}, index) => (
        <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}>
          <span className='tech-tooltip'>{tech}</span>
          <Image src={url} alt={tech} width={100} height={100} className="size-5"/>
        </div>
      ))}
    </div>
  )
}
export default DisplayTechicons

