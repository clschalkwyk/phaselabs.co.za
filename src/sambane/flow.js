export const nodes = [
  { id: 'farmer', label: 'The farmer', detail: 'Request + rand limit', x: -5, z: 0 },
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
    body: 'Enter the item, quantity, destination and rand limit in Sambane Wallet. QVAC extraction has been rehearsed on Android; missing details need clarification and the farmer reviews the request. WhatsApp text intake is demonstrated, while its budget flow is still being validated.',
    boundary: 'A request is never permission to borrow or move money.',
    active: ['farmer', 'intent', 'product'],
  },
  {
    title: 'Source', heading: 'Let specialist brokers do the legwork.',
    body: 'Product and Logistics brokers coordinate synthetic supplier offers and Bob Go Sandbox rates. The farmer sees the landed cost, including delivery, before selecting a quote.',
    boundary: 'Real catalogue observations are separate from selectable demo quotes. Sandbox bookings do not move goods.',
    active: ['product', 'suppliers', 'logistics', 'proposal'],
  },
  {
    title: 'Approve', heading: 'Keep the decisions with the farmer.',
    body: 'An over-budget quote requires an explicit choice to request funding or revise the request. In the credit rehearsal, two Stokvel members endorse the terms, a separate lender funds the shortfall, and the borrower approves supplier and courier payments. The XRP broker mandate is a separate Testnet demonstration.',
    boundary: 'Separate approvals. Separate balances. No unrestricted agent signing.',
    active: ['farmer', 'proposal'],
  },
  {
    title: 'Verify', heading: 'Bring back evidence, not just an answer.',
    body: 'The wallet and dashboard show verified XRP Testnet broker-payment evidence. A separate Sepolia rehearsal verified the lender, supplier and courier transfers. An approved Bob Go Sandbox booking produced a test waybill, with QVAC OCR reading its reference and date.',
    boundary: 'A payment receipt does not prove that goods were delivered.',
    active: ['farmer', 'product', 'logistics', 'proposal'],
  },
];
