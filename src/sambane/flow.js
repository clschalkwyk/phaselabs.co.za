export const nodes = [
  { id: 'farmer', label: 'The farmer', detail: 'Request + spending terms', x: -5, z: 0 },
  { id: 'intent', label: 'Confirm the need', detail: 'Review + clarify', x: -2.6, z: 0 },
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
    body: 'Describe the item, quantity and destination in the text-first Android app. The native XRP order screen is available in selected demo builds and uses fixed demo XRP prices, not a fiat conversion.',
    boundary: 'A request is never permission to borrow or move money.',
    active: ['farmer', 'intent', 'product'],
  },
  {
    title: 'Source', heading: 'Let specialist brokers do the legwork.',
    body: 'Product and Logistics coordinate a proposal using simulated supplier invoices and Bob Go Sandbox logistics. The farmer reviews the supplier, courier and total before authorizing the order.',
    boundary: 'Demo quotes are not executable real-world offers. Sandbox bookings do not move goods.',
    active: ['product', 'suppliers', 'logistics', 'proposal'],
  },
  {
    title: 'Approve', heading: 'Keep the decisions with the farmer.',
    body: 'The farmer signs a bounded mandate, two Stokvel members endorse the terms off-chain, and a lender authorizes Testnet XRP funding to the farmer. The farmer then deposits the order funds into the agent wallet.',
    boundary: 'Separate approvals. No locked collateral. No unrestricted agent signing.',
    active: ['farmer', 'proposal'],
  },
  {
    title: 'Verify', heading: 'Bring back evidence, not just an answer.',
    body: 'The runner checks x402 payment requirements against the mandate before paying the approved supplier and courier demo wallets. Caps and payment journaling guard against blind repeats. A separate sandbox booking rehearsal is not part of this settlement flow.',
    boundary: 'A payment receipt does not prove that goods were delivered.',
    active: ['farmer', 'product', 'logistics', 'proposal'],
  },
];
