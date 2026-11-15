export const nodes = [
  { id: 'farmer', label: 'The farmer', detail: 'Need + constraints', x: -5, z: 0 },
  { id: 'intent', label: 'Clarify the request', detail: 'Product + quantity + timing', x: -2.6, z: 0 },
  { id: 'product', label: 'Sourcing assistant', detail: 'Research + coordinate', x: -0.1, z: 0 },
  { id: 'suppliers', label: 'Supplier options', detail: 'Suitability + quotes', x: 2.4, z: -2.4 },
  { id: 'logistics', label: 'Transport options', detail: 'Collection or delivery', x: 2.4, z: 2.4 },
  { id: 'proposal', label: 'Buying proposal', detail: 'Farmer approval', x: 5, z: 0 },
];
export const edges = [
  { from: 'farmer', to: 'intent', stages: [0] },
  { from: 'intent', to: 'product', stages: [0, 1] },
  { from: 'product', to: 'suppliers', stages: [1] },
  { from: 'product', to: 'logistics', stages: [2] },
  { from: 'suppliers', to: 'proposal', stages: [1, 3] },
  { from: 'logistics', to: 'proposal', stages: [2, 3] },
  { from: 'proposal', to: 'farmer', stages: [3], return: true },
];
export const stages = [
  {
    title: 'Understand', heading: 'Turn a request into clear requirements.',
    body: 'Start with what the farmer needs. Clarify the input type, specification, quantity, budget, location and required date, including acceptable alternatives and whether collection is possible.',
    boundary: 'The assistant asks about missing details rather than guessing. This is the planned workflow.',
    active: ['farmer', 'intent', 'product'],
  },
  {
    title: 'Source', heading: 'Find suitable inputs and follow up on the details.',
    body: 'Research relevant suppliers, request quotes and clarify stock, pack sizes, terms and lead times. Follow up on better-fit alternatives or pricing, then compare like-for-like offers against the farmer’s needs.',
    boundary: 'Supplier outreach must be permissioned. Quotes and unconfirmed listings are clearly distinguished; a request for pricing is not an order.',
    active: ['product', 'suppliers', 'proposal'],
  },
  {
    title: 'Plan transport', heading: 'Work out how the inputs will reach the farm.',
    body: 'Check whether the farmer will collect, the supplier can deliver or a courier is needed. Where delivery is required, liaise with logistics providers for quotes based on the load, route and timing, and make responsibility for transport explicit.',
    boundary: 'Surface pickup requirements, delivery limitations and missing costs. A courier quote is not a booking.',
    active: ['farmer', 'product', 'logistics', 'proposal'],
  },
  {
    title: 'Review', heading: 'Bring the whole proposal back to the farmer.',
    body: 'Present the supplier, products, quantities, itemised costs, collection or delivery arrangements, lead times and quote validity together. Explain the recommendation and trade-offs so the farmer can approve, amend or decline.',
    boundary: 'The sourcing engine stops at the approval handoff. Payment, order placement and transport booking are separate actions.',
    active: ['farmer', 'suppliers', 'logistics', 'proposal'],
  },
];
