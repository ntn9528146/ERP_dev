import { kindergartenSubjects } from './kindergarten/subjects';
import { primarySubjects } from './primary/subjects';
import { middleSubjects } from './middle/subjects';
import { secondarySubjects } from './secondary/subjects';
import { seniorSecondarySubjects } from './seniorSecondary/subjects';

export const getSubjectsByClass = (className: string): { code: string; name: string }[] => {
  if (['Nursery', 'LKG', 'UKG'].includes(className)) {
    return kindergartenSubjects[className]?.subjects || [];
  }
  if (primarySubjects[className]) {
    return primarySubjects[className];
  }
  if (middleSubjects[className]) {
    return middleSubjects[className];
  }
  if (secondarySubjects[className]) {
    return secondarySubjects[className];
  }
  if (seniorSecondarySubjects[className]) {
    return seniorSecondarySubjects[className];
  }
  return [];
};
