import { useEffect } from 'react';
import logo from './assets/phaselabs-header-lockup.svg';

// Public edition of CardBuddy docs/USER_GUIDE.md; contact-bearing captures stay private.
export default function CardBuddyGuide() {
  useEffect(() => { document.title = 'CardBuddy user guide | PhaseLabs'; }, []);
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
          <p>Version 1.13 · Build 15 · Android 7.0 or later</p>
<p>This guide describes CardBuddy 1.13. Screens can differ on older versions and across Android devices.</p>
<p>CardBuddy keeps your business card ready for introductions. No account is required. Your cards and QR codes can be displayed offline; opening a shared website still requires an internet connection.</p>
<h2 id="install-or-update">Install or update</h2>
<ol><li>Visit <a href="https://phaselabs.co.za/#cardbuddy">CardBuddy on the PhaseLabs website</a> and request access using your Google Play email.</li><li>Once your email is added and the closed test is available, open the <a href="https://play.google.com/apps/testing/co.za.phaselabs.cardbuddy">closed-test link</a>, opt in and install from Google Play.</li><li>Open CardBuddy and add your details. Remain opted in for at least 14 days to help qualify the app for public release.</li></ol>
<p>If you joined the internal test, leave it before opting into the closed test. This test version may lose saved cards or images: use test data and keep copies of important details and images elsewhere. Do not uninstall or clear app storage to update.</p>
<h2 id="main-screen">Main screen</h2>
<p>Swipe the card carousel to select the active card. Use <strong>Manage cards</strong> to choose, create or copy cards, <strong>Edit</strong> to update the active card, and <strong>Present</strong> or <strong>Share card</strong> when you are ready.</p>
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
<p><strong>App background</strong> changes the colour around all cards and editing screens. Choose a preset or <strong>Custom colour</strong>, tap a swatch or the spectrum, then <strong>Apply</strong>. <strong>Advanced · hex colour</strong> accepts six-digit hex values such as <code>#245A78</code>.</p>
<p><strong>Layout</strong> offers Portrait, Business, Classic, Photo left and Photo right. <strong>Choose accent colour</strong> changes the selected card&#x27;s accent. The interface adjusts accent contrast for readability, so button colours may differ from the exact card accent. <strong>More card styles</strong> reveals the available base styles.</p>
<p><strong>Background image</strong> accepts your artwork. Use a 16:9 image for predictable framing; other proportions are cropped to fit. Choose <strong>Dark text</strong> or <strong>Light text</strong> to suit the artwork. Turn on <strong>Readable details panel</strong> when text needs a solid background. Business layout has its own arrangement, so its controls differ from the other artwork layouts.</p>
<p>For Business layout, <strong>QR destination</strong> can point to <strong>Add to contacts</strong> or one of the card&#x27;s links. The separate <strong>Show contact QR</strong> sharing action continues to show contact details.</p>

<h2 id="move-and-resize-artwork-elements">Move and resize artwork elements</h2>
<p>Placement is available for Business layout and for other layouts with a background image. Open it from <strong>Edit</strong>, or tap <strong>Adjust placement</strong> in presentation.</p>
<p><strong>Business layout:</strong> Choose <strong>Placement · move QR</strong>, then drag the QR to move it. <strong>Reset</strong> returns the QR to its default position.</p>
<p><strong>Other layouts with artwork:</strong> Choose <strong>Placement · move details and QR</strong>. Drag the details block or profile photo to move it, and drag its bottom-right handle to resize it. Choose <strong>No QR</strong>, <strong>QR left</strong> or <strong>QR right</strong>; drag a visible QR to move it. <strong>Reset</strong> restores the element positions and sizes.</p>
<p>Tap <strong>Done</strong> when the arrangement looks right. Placement saves automatically. The QR cannot be resized, and elements can overlap, so check the result before sharing. Reset does not reset the full design.</p>
<h2 id="present-the-card">Present the card</h2>
<p>Tap <strong>Present</strong> to open the presentation view. Tap the card background to show or hide its controls. Use <strong>Share</strong> to share from this view, or <strong>Close</strong> to return.</p>
<h2 id="share-a-contact-qr-image-or-pdf">Share a contact QR, image or PDF</h2>
<p>Tap <strong>Share card</strong> on the main screen, or <strong>Share</strong> in presentation.</p>
<ul><li><strong>Show contact QR</strong> opens a large QR containing your contact details. Ask the recipient to scan it with their phone. Their scanner determines how the contact is imported.</li><li><strong>Share image</strong> prepares a PNG of the card.</li><li><strong>Share PDF</strong> prepares a PDF of the card.</li></ul>
<p>For image or PDF, inspect the preview, tap <strong>Share</strong>, then select an app or recipient in Android&#x27;s chooser. Only the card is exported, without the editor controls or surrounding app background. Available save destinations depend on the apps installed on your phone.</p>
<p>Tap <strong>Add to contacts ▾</strong> at the top of the enlarged QR view to switch between the contact QR and one of your additional links. The displayed QR updates to the selected destination. Use this large view when the card’s smaller QR is difficult to scan.</p>
<h2 id="open-a-card-from-a-home-screen-widget">Open a card from a home-screen widget</h2>
<ol><li>Open <strong>⋮ → Home-screen widgets</strong> and follow the instructions to add a widget.</li><li>Choose the card for that widget and tap <strong>Use this card</strong> when prompted.</li><li>Tap the widget to open its assigned card in presentation. Use widget settings to reassign an existing widget.</li></ol>
<p>If your launcher does not support adding it from the app, long-press your home screen, choose <strong>Widgets</strong>, then find CardBuddy. Widget placement depends on your launcher.</p>
<h2 id="reset-the-styling">Reset the styling</h2>
<p>Open Design and tap <strong>Reset styling</strong>. Read and confirm the dialog.</p>
<p>This restores the selected card&#x27;s default style, layout, accent, element sizes and positions; removes its artwork reference; disables the readable details panel; and resets the global app background to black. Contact details, links and the profile photo are kept. Other cards keep their designs. This action does not delete the stored image files.</p>
<h2 id="storage-and-troubleshooting">Storage and troubleshooting</h2>
<p>Card details and imported images are stored on your device. Version 1.11 has no in-app backup/restore or account sync. In version 1.13, choose Edit → Backup and restore to save a backup or restore cards as copies. Backup files contain contact details and images and are not encrypted, so keep them private. PNG/PDF exports are shareable copies, not backups that can be imported to restore editable cards. Keep backups in a private location and retain your original images; Android system backup alone is not a verified recovery method.</p>
<div className="guide-table"><table><thead><tr><th scope="col">Problem</th><th scope="col">Try this</th></tr></thead><tbody><tr><td>Details disappeared after editing</td><td>Tap Save and wait for completion; retry any save error. Check that the intended card is selected.</td></tr><tr><td>Placement option is absent</td><td>Choose Business layout for QR placement, or add background artwork to another layout to enable placement.</td></tr><tr><td>Photo is missing</td><td>Check that a photo is saved and that the selected style shows photos.</td></tr><tr><td>Text blends into artwork</td><td>Select Light/Dark text or enable Readable details panel.</td></tr><tr><td>Widget opens another card</td><td>Open ⋮ → Home-screen widgets and assign the intended card to that widget.</td></tr><tr><td>QR is hard to scan</td><td>Open Show contact QR or enlarge the selected link QR; avoid glare and ask the recipient to try again.</td></tr><tr><td>Export fails</td><td>Read the displayed error, check device storage and retry.</td></tr></tbody></table></div>
          <p className="guide-updated">Prepared 29 October 2026 · Guide for Android version 1.13, build 15.</p>
          <a href="#guide-content">Back to top ↑</a>
        </main>
      </div>
      <footer className="site-footer frame"><img src={logo} alt="PhaseLabs" /><p>Your business card, ready to share.</p></footer>
    </div>
  );
}
