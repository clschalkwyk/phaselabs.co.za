import logo from './assets/phaselabs-header-lockup.svg';

// Public edition of CardBuddy docs/USER_GUIDE.md; contact-bearing captures stay private.
export default function CardBuddyGuide() {
  return (
    <div className="site-shell guide-shell">
      <a className="skip-link" href="#guide-content">Skip to guide</a>
      <header className="site-header frame">
        <a href="/" aria-label="PhaseLabs home"><img className="brand-logo" src={logo} alt="PhaseLabs" /></a>
        <a className="header-link" href="/#cardbuddy">Back to CardBuddy <span aria-hidden="true">↗</span></a>
      </header>
      <div className="guide-layout frame">
        <nav className="guide-toc" aria-label="Guide contents">
          <p className="eyebrow">In this guide</p>
          <a href="#install-or-update">Install or update</a>
<a href="#first-test">Your first test</a>
<a href="#send-feedback">Send feedback</a>
<a href="#main-screen">Main screen</a>
<a href="#add-your-details">Add your details</a>
<a href="#use-several-cards">Use several cards</a>
<a href="#change-the-design">Change the design</a>
<a href="#move-and-resize-artwork-elements">Move and resize artwork elements</a>
<a href="#present-the-card">Present the card</a>
<a href="#share-a-contact-qr-image-or-pdf">Share a contact QR, image or PDF</a>
<a href="#open-a-card-from-a-home-screen-widget">Open a card from a home-screen widget</a>
<a href="#reset-the-styling">Reset the styling</a>
<a href="#storage-and-troubleshooting">Storage and troubleshooting</a>
        </nav>
        <main className="guide-content" id="guide-content">
          <p className="eyebrow">CardBuddy documentation</p>
          <h1>User guide</h1>
          <p>Version 1.14-qa · Build 16 · Android 7.0 or later</p>
<p>This guide describes the CardBuddy 1.14-qa closed-test release (build 16). Screens can differ on older versions and across Android devices.</p>
<p>CardBuddy keeps your business card ready for introductions. No account is required. Your cards and QR codes can be displayed offline; opening a shared website still requires an internet connection.</p>
<h2 id="install-or-update">Install or update</h2>
<ol>
<li>Request beta access using the Google email you use for Google Play. If you have already received a tester invitation, you do not need to request access again.</li>
<li>After your email has been added and the closed test is available, open the link in your invitation or the <a href="https://play.google.com/apps/testing/co.za.phaselabs.cardbuddy">CardBuddy closed-test page</a>.</li>
<li>Sign in with the <strong>same Google account that was invited</strong>. If your browser and Play Store use different accounts, switch both to the invited account.</li>
<li>Opt into the test if prompted, then follow the Google Play link to install CardBuddy. If you already have it, update through Google Play instead.</li>
</ol>
<p>Please stay opted in for at least <strong>14 consecutive days</strong> and try the app during that time. Installing alone is not the same as remaining opted into the test.</p>
<p>If you joined the older internal test, leave that test before opting into the closed test. This test version may lose saved cards or images: use test data and keep copies of important details and images elsewhere. <strong>Do not uninstall or clear app storage just to update.</strong></p>
<p>If Google Play says the app is unavailable or you cannot join, check the account in both your browser and Play Store first. Access must be added for that account, and the test must be available. If it still does not work, reply to your invitation with the exact message you see. Do not send passwords or sign-in codes.</p>
<h2 id="first-test">Your first test</h2>
<ol>
<li>Open CardBuddy, select a card or create a new blank card from <strong>Manage cards</strong>.</li>
<li>Open <strong>Edit</strong>, add a name and a few test contact details, then <strong>Save</strong>. Check that the details appear on the card.</li>
<li>Open <strong>Share card → Show contact QR</strong>. Scan it with another phone and check that the intended contact details appear. You do not need to save the contact to test the scan.</li>
<li>Optionally try <strong>Share image</strong> or <strong>Share PDF</strong>. Check the preview before choosing where to save or share it. Only share details you intend the recipient to receive.</li>
<li>Close and reopen CardBuddy and check that your card is still there. Tell us about anything confusing or unexpected.</li>
</ol>
<h2 id="send-feedback">Send feedback</h2>
<p>Reply to your tester invitation with what worked, what was confusing, or what went wrong. Include your phone model, Android version, CardBuddy version and the steps that led to the problem. A screenshot helps, but hide any private contact details first. Never include passwords or sign-in codes.</p>
<h2 id="main-screen">Main screen</h2>
<p>In portrait orientation, swipe the card carousel to select the active card. In landscape, use the card selector. Use <strong>Manage cards</strong> to choose, create or copy cards, <strong>Edit</strong> to update the active card, and <strong>Present</strong> or <strong>Share card</strong> when you are ready.</p>
<h2 id="add-your-details">Add your details</h2>
<ol><li>Select <strong>Edit → My details · name, contact and links</strong>.</li><li>Enter your name, title, organization, pronouns, optional tagline, email and phone number as needed.</li><li>Use <strong>Add link</strong> to add a website or social link. Choose the link type and enter its address. The delete icon removes that link from the draft.</li><li>Tap <strong>Save</strong> and wait for it to finish. If saving fails, the editor displays an error so you can retry.</li></ol>
<p>If you go Back with unsaved details, choose <strong>Save changes</strong>, <strong>Keep editing</strong>, or <strong>Discard</strong>. Photo changes save separately; Discard does not undo a photo change.</p>
<p>To add a photo, use <strong>Pick</strong> in Details and complete the photo editor. <strong>Replace</strong> changes an existing photo; <strong>Remove</strong> clears it from the card. Some card styles hide photos, so check the selected style if your photo is not visible.</p>
<h2 id="use-several-cards">Use several cards</h2>
<p>Tap <strong>Manage cards</strong> to open <strong>My business cards</strong>.</p>
<ul><li>Select a card to make it active.</li><li><strong>New blank card</strong> creates a blank card.</li><li><strong>Copy this card</strong> copies the selected card for a variation.</li><li><strong>Rename label</strong> changes its label in the card list, rather than the name printed on the card.</li><li><strong>Design and layout</strong> opens the selected card&#x27;s design settings.</li><li><strong>Home-screen widgets</strong> opens widget settings.</li></ul>
<p>Card labels must contain 1–40 characters. There is no card-delete control in this version.</p>
<h2 id="change-the-design">Change the design</h2>
<p>Open <strong>Edit → Design · background and layout</strong>. Preview a template before applying it. Design changes save automatically; check for any error before leaving.</p>
<p><strong>App background</strong> changes the colour around all cards and editing screens. Choose a preset or <strong>Custom colour</strong>, tap a swatch or the spectrum, then <strong>Apply</strong>. <strong>Hex colour</strong> accepts six-digit hex values such as <code>#245A78</code>.</p>
<p><strong>Layout</strong> offers <strong>Portrait</strong> and <strong>Landscape</strong> card shapes. Selecting either shape, even the current one, resets moved elements. <strong>Reset layout</strong> restores the selected shape’s element positions and sizes without removing your details or images. Existing cards may show <strong>Custom</strong> until you choose a shape.</p>
<p><strong>Font</strong> offers Sans, Serif and Mono. <strong>Text size</strong> offers Compact, Standard and Larger. Use <strong>Choose text colour</strong> and <strong>Choose accent colour</strong> to adjust the card. Business styles also offer <strong>Choose card colour</strong> and <strong>Use style colour</strong>. <strong>More card styles</strong> reveals the base styles; these are separate from the Portrait/Landscape shape controls.</p>
<p><strong>Background image</strong> accepts your artwork and crops it to the card shape, so preview it after choosing Portrait or Landscape. Choose <strong>Dark text</strong>, <strong>Light text</strong> or a custom text colour to suit the artwork. Depending on the style, enable <strong>Text background</strong> or <strong>Readable details panel</strong> for contrast.</p>
<p>Check <strong>Full-size preview</strong> before sharing. Long details can become smaller or shortened; larger text can clip. If a QR-overlap warning appears, move the QR to a clear area and inspect the full-size result rather than relying only on the small design preview.</p>
<p><strong>QR code</strong> includes <strong>Show QR code</strong> and <strong>Reset QR position</strong>. Older custom layouts may offer <strong>Enable free QR positioning</strong>. Keep the QR’s white margin clear for scanning.</p>
<p>For Business styles, <strong>QR destination</strong> can point to <strong>Add to contacts</strong> or one of the card&#x27;s links. The separate <strong>Show contact QR</strong> sharing action continues to show contact details.</p>
<h3>Add and position a logo</h3>
<p>In Design, find <strong>Logo → Choose logo</strong>. This is separate from your profile photo and background artwork; transparency and proportions are preserved. Use <strong>Replace logo</strong> or <strong>Remove logo</strong> for an existing logo.</p>
<p>Choose <strong>Position logo</strong>, then drag the logo to move it or its corner to resize it. Changes save automatically. <strong>Reset logo placement</strong> restores its placement; check for a save error before leaving.</p>


<h2 id="move-and-resize-artwork-elements">Move and resize artwork elements</h2>
<p>Placement is available with a selected Portrait/Landscape card shape, enabled free QR positioning, background artwork, or a Business style. Open it from <strong>Edit</strong>, or tap <strong>Adjust placement</strong> in presentation.</p>
<p><strong>Placement · move QR</strong> is shown for Business styles; other styles show <strong>Placement · move details and QR</strong>. Drag the visible QR to move it. Where the details block and photo have editing handles, drag them to move them and use the corner handles to resize them.</p>
<p>For current card shapes, use Design’s <strong>Show QR code</strong> switch and free positioning. <strong>No QR</strong>, <strong>QR left</strong> and <strong>QR right</strong> appear only for older custom artwork layouts without the newer shape/free-positioning controls.</p>
<p>Tap <strong>Done</strong> when the arrangement looks right. Placement saves automatically. The QR cannot be resized, and elements can overlap, so check the result before sharing. Placement reset controls do not reset the full design. Position a separate logo through <strong>Design → Position logo</strong>.</p>
<h2 id="present-the-card">Present the card</h2>
<p>Tap <strong>Present</strong> to open the presentation view. Tap the card background to show or hide its controls. Use <strong>Share</strong> to share from this view, or <strong>Close</strong> to return.</p>
<h2 id="share-a-contact-qr-image-or-pdf">Share a contact QR, image or PDF</h2>
<p>Tap <strong>Share card</strong> on the main screen, or <strong>Share</strong> in presentation.</p>
<ul><li><strong>Show contact QR</strong> opens a large QR containing your contact details. Ask the recipient to scan it with their phone. Their scanner determines how the contact is imported.</li><li><strong>Share contact file</strong> opens Android’s chooser with a vCard contact file. The receiving app controls importing it; review which details you are sharing.</li><li><strong>Share image</strong> prepares a PNG of the card.</li><li><strong>Share PDF</strong> prepares a PDF of the card.</li></ul>
<p>For image or PDF, inspect the preview, tap <strong>Share</strong>, then select an app or recipient in Android&#x27;s chooser. Only the card is exported, without the editor controls or surrounding app background. Available save destinations depend on the apps installed on your phone.</p>
<p>Tap <strong>Add to contacts ▾</strong> at the top of the enlarged QR view to switch between the contact QR and one of your additional links. The displayed QR updates to the selected destination. Use this large view when the card’s smaller QR is difficult to scan.</p>
<h2 id="open-a-card-from-a-home-screen-widget">Open a card from a home-screen widget</h2>
<ol><li>Open <strong>⋮ → Home-screen widgets</strong> and follow the instructions to add a widget.</li><li>Choose the card for that widget and tap <strong>Use this card</strong> when prompted.</li><li>Tap the widget to open its assigned card in presentation. Use widget settings to reassign an existing widget.</li></ol>
<p>If your launcher does not support adding it from the app, long-press your home screen, choose <strong>Widgets</strong>, then find CardBuddy. Widget placement depends on your launcher.</p>
<h2 id="reset-the-styling">Reset the styling</h2>
<p>Open Design and tap <strong>Reset styling</strong>. Read and confirm the dialog.</p>
<p>This restores the selected card&#x27;s default style, layout, accent, element sizes and positions; removes its artwork reference; disables the readable details panel; and resets the global app background to black. Contact details, links, the profile photo and logo are kept. Other cards keep their designs. This action does not delete the stored image files.</p>
<h2 id="storage-and-troubleshooting">Storage and troubleshooting</h2>
<p>Card details and imported images are stored on your device. Choose <strong>Edit → Backup and restore → Save backup</strong> to save a ZIP backup. Use <strong>Restore backup</strong> and confirm <strong>Add cards</strong> to restore cards as copies. Existing cards and widgets are not replaced; the app background and active selection stay unchanged. There is no account sync. Backup files contain contact details and images and are not encrypted, so keep them private. PNG/PDF exports are shareable copies, not backups that can be imported to restore editable cards. Keep backups in a private location and retain your original images; Android system backup alone is not a verified recovery method.</p>
<div className="guide-table"><table><thead><tr><th scope="col">Problem</th><th scope="col">Try this</th></tr></thead><tbody><tr><td>Details disappeared after editing</td><td>Tap Save and wait for completion; retry any save error. Check that the intended card is selected.</td></tr><tr><td>Placement option is absent</td><td>Choose a Portrait/Landscape shape in Design, enable free QR positioning where offered, or use artwork/a Business style.</td></tr><tr><td>Photo is missing</td><td>Check that a photo is saved and that the selected style shows photos.</td></tr><tr><td>Text blends into artwork</td><td>Choose a contrasting text colour or enable Text background/Readable details panel. Check Full-size preview.</td></tr><tr><td>Widget opens another card</td><td>Open ⋮ → Home-screen widgets and assign the intended card to that widget.</td></tr><tr><td>QR is hard to scan</td><td>Open Show contact QR or enlarge the selected link QR; avoid glare and ask the recipient to try again.</td></tr><tr><td>Export fails</td><td>Read the displayed error, check device storage and retry.</td></tr></tbody></table></div>
          <p className="guide-updated">Updated 19 November 2026 · Checked against the 1.14-qa, build 16 source snapshot and active closed-test release. Screens can vary by device and saved card style.</p>
          <a href="#guide-content">Back to top ↑</a>
        </main>
      </div>
      <footer className="site-footer frame"><img src={logo} alt="PhaseLabs" /><p>Your business card, ready to share.</p></footer>
    </div>
  );
}
