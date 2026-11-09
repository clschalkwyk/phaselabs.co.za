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
    body: 'The prototype accepted a WhatsApp text request for chicken feed and resolved “the farm” to a saved address. Voice is a separate Android proof of concept; the illustrated design includes an editable request for the farmer to confirm.',
    boundary: 'A voice request is never permission to move money.',
    active: ['farmer', 'intent', 'product'],
  },
  {
    title: 'Source', heading: 'Let specialist brokers do the legwork.',
    body: 'Product and Logistics brokers used OpenRouter, a synthetic supplier catalogue and Bob Go Sandbox quotes, then replied on WhatsApp. The diagram illustrates how those roles coordinate.',
    boundary: 'The catalogue is synthetic and quotes come from a sandbox. Courier booking and fulfilment are simulated.',
    active: ['product', 'suppliers', 'logistics', 'proposal'],
  },
  {
    title: 'Approve', heading: 'Keep the decisions with the farmer.',
    body: 'The demonstrated 0.01 XRP Product-to-Logistics payment was approved on Android and signed on the Mac. The wider design keeps broker budgets, loan terms and optional demo purchases under separate approvals. A lender must also authorize a test disbursement; lending remains undemonstrated.',
    boundary: 'Separate approvals. Separate balances. No unrestricted agent signing.',
    active: ['farmer', 'proposal'],
  },
  {
    title: 'Verify', heading: 'Bring back evidence, not just an answer.',
    body: 'Both XRP Testnet transfers landed. The Product-to-Logistics payment was independently verified on the ledger and its receipt appeared in the Railway dashboard. Sepolia work currently reads test-token balances; lending disbursement and repayment remain undemonstrated.',
    boundary: 'A payment receipt does not prove that goods were delivered.',
    active: ['farmer', 'product', 'logistics', 'proposal'],
  },
];
