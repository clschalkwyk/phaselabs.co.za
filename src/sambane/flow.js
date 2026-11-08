export const nodes = [
  { id: 'farmer', label: 'The farmer', detail: 'Voice or text', x: -5, z: 0 },
  { id: 'intent', label: 'Confirm the need', detail: 'Editable request', x: -2.6, z: 0 },
  { id: 'product', label: 'Product Broker', detail: 'Find + coordinate', x: -0.1, z: 0 },
  { id: 'suppliers', label: 'Supplier catalogue', detail: 'Synthetic offers', x: 2.4, z: -2.4 },
  { id: 'logistics', label: 'Logistics Broker', detail: 'Delivery estimate', x: 2.4, z: 2.4 },
  { id: 'proposal', label: 'One proposal', detail: 'Back to the farmer', x: 5, z: 0 },
];

export const edges = [
  { from: 'farmer', to: 'intent', stages: [0] },
  { from: 'intent', to: 'product', stages: [0, 1] },
  { from: 'product', to: 'suppliers', stages: [1] },
  { from: 'product', to: 'logistics', stages: [1] },
  { from: 'suppliers', to: 'proposal', stages: [1, 2] },
  { from: 'logistics', to: 'proposal', stages: [1, 2] },
  { from: 'proposal', to: 'farmer', stages: [2, 3], return: true },
];

export const stages = [
  {
    title: 'Ask', heading: 'Start with the farmer, not the technology.',
    body: 'Speak or type what is needed, how much, and where it should go. The planned Android app turns that into an editable request for the farmer to confirm.',
    boundary: 'A voice request is never permission to move money.',
    active: ['farmer', 'intent', 'product'],
  },
  {
    title: 'Source', heading: 'Let specialist brokers do the legwork.',
    body: 'The Product Broker is designed to compare a controlled supplier catalogue and call a Logistics Broker for delivery estimates. Together, they would build a ranked, landed-price proposal.',
    boundary: 'Demo supplier names, stock, prices and delivery quotes are synthetic.',
    active: ['product', 'suppliers', 'logistics', 'proposal'],
  },
  {
    title: 'Approve', heading: 'Keep the decisions with the farmer.',
    body: 'The farmer reviews the proposal and separately approves a capped broker budget, any demo loan terms and any optional demo purchase. A lender must also authorize a test disbursement.',
    boundary: 'Separate approvals. Separate balances. No unrestricted agent signing.',
    active: ['farmer', 'proposal'],
  },
  {
    title: 'Verify', heading: 'Bring back evidence, not just an answer.',
    body: 'The planned activity timeline connects broker calls, approvals and independently checked testnet receipts. It distinguishes a verified payment from a pending transfer or a delivery claim.',
    boundary: 'A payment receipt does not prove that goods were delivered.',
    active: ['farmer', 'product', 'logistics', 'proposal'],
  },
];
