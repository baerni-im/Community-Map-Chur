import * as turf from '@turf/turf'

const polygon = turf.polygon(
  [
    [
      [
        9.481854, /*oben links */
        46.877326 /*oben links*/
      ],
      [
        9.569363, /*unten rechts */
        46.877326 /*oben links*/
      ],
      [
        9.569363, /*unten rechts*/
        46.847278 /*unten rechts*/
      ],
      [
        9.481854, /*oben links*/
        46.847278 /*unten rechts*/
      ],
      [
        9.481854, /*oben links*/
        46.877326 /*oben links*/
      ]
    ]
  ]
)

const masked = turf.mask(polygon);


export default masked;
