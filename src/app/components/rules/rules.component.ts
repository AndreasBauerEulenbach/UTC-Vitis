import { Component } from '@angular/core';
import {Accordion, InstanceOptions} from "flowbite";
import type { AccordionOptions, AccordionItem, AccordionInterface } from "flowbite";

// create an array of objects with the id, trigger element (eg. button), and the content element
// open accordion item based on id
const accordionItems: AccordionItem[] = [
  {
    id: 'accordion-collapse-heading-1',
    triggerEl: document.getElementById('accordion-collapse-heading-1'),
    targetEl: document.getElementById('accordion-collapse-body-1'),
    active: true
  },
  {
    id: 'accordion-collapse-heading-2',
    triggerEl: document.getElementById('accordion-collapse-heading-2'),
    targetEl: document.getElementById('accordion-collapse-body-2'),
    active: false
  },
  {
    id: 'accordion-collapse-heading-3',
    triggerEl: document.getElementById('accordion-collapse-heading-3'),
    targetEl: document.getElementById('accordion-collapse-body-3'),
    active: false
  }
];

// options with default values
const options: AccordionOptions = {
  alwaysOpen: false,
  activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
  inactiveClasses: 'text-gray-500 dark:text-gray-400',
  onOpen: (item) => {
    console.log('accordion item has been shown');
    console.log(item);
  },
  onClose: (item) => {
    console.log('accordion item has been hidden');
    console.log(item);
  },
  onToggle: (item) => {
    console.log('accordion item has been toggled');
    console.log(item);
  },
};

const instanceOptions: InstanceOptions = {
  id: 'accordion-collapse',
  override: true
};


@Component({
  selector: 'app-rules',
  standalone: true,
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent {

  /*
  * accordionItems: array of accordion item objects
  * options: optional
  */
  // const accordion: AccordionInterface = new Accordion(accordionItems, options);

  public openAccordion(id: string) {
    const accordionEl = document.getElementById(id);

    const accordion: AccordionInterface = new Accordion(accordionEl, accordionItems, options, instanceOptions);

// open accordion item based on id
    accordion.open(id);
  }
}

