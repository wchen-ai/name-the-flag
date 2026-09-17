'use strict';

// Visual tags for the bundled flag images, not an official classification.
// Tags may overlap. Bands describe the main field; crosses and diagonals
// include prominent cantons, but not tiny details inside coats of arms.
// "Center" includes symbols around the middle of the flag's main field.
const FLAG_PATTERNS = {
  vertical: 'ad ae af bb be bh bj ca ci cm dz fr gn gt gw ie it lk md mg ml mn mt mx ng om pe pk pt qa ro sn td va vc'.split(' '),
  horizontal: 'ae ag am ao ar at az bf bg bj bo bw by bz cf cl co cr cu cv cz de dj ec ee eg er es et ga gh gm gq gr gw hn hr ht hu id il in iq ir jo ke kh ki km kp kw la lb li lr ls lt lu lv ly mc mg mm mr mu mw my mz ne ni nl nr om ph pl ps py rs ru rw sd sg si sk sl sm sr ss st sv sy sz tg th tj ua ug us uy uz ve ye zw'.split(' '),
  center: 'ad af al ao ar az bb bd bf bi bn bo br bt bz ca cm cr cy dm do dz ec eg es et fm gd gh gq gt hn hr ht il in iq ir jp ke kg kh kr kz la lb lc lk ls ly ma md me mk mm mr mv mx ne ni pk pt pw py rs sa sk sm sn so sr st sv sy sz tj tn tr ug va vc ve vn'.split(' '),
  diagonal: 'ag au ba bi bn bs bt cd cg cu cz dj er fj gb gd gq gy jm jo km kn lc mh mz na np nz pg ph ps sb sc sd ss st tl tt tv tz vu za zw'.split(' '),
  cross: 'au bi ch dk dm do fi fj gb ge gr is jm no nz se to tv'.split(' ')
};
const patternIds = Object.keys(FLAG_PATTERNS);
const patternCountries = new Map(patternIds.map(id => [id, new Set(FLAG_PATTERNS[id])]));
function matchesFlagPatterns(country, selected) {
  return selected.size === 0 || [...selected].some(id => patternCountries.get(id)?.has(country.code));
}
