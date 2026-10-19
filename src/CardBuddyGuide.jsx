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
          <p>Version 1.11 · Build 13 · Android 7.0 or later</p>
<p>This guide shows version 1.11 (build 13). The website download currently provides version 1.9 (build 11), so some screens and contact-display behaviour may differ until the next release.</p>
<p>CardBuddy keeps your business card ready for introductions. No account is required. Your cards and QR codes can be displayed offline; opening a shared website still requires an internet connection.</p>
<h2 id="install-or-update">Install or update</h2>
<ol><li>Visit <a href="https://phaselabs.co.za/#cardbuddy">CardBuddy on the PhaseLabs website</a> on your Android phone.</li><li>Download the APK and open it. Android may ask you to allow installation from your browser before continuing.</li><li>Open CardBuddy and add your details.</li></ol>
<p>For an update, install the newer PhaseLabs APK over the existing app. Keep the existing installation to retain your cards. Do not clear app storage or uninstall as part of a normal update.</p>
<h2 id="main-screen">Main screen</h2>
<p>Use the toolbar to present or edit your card, the card-name dropdown to switch cards, and Share card to open sharing options.</p>
<h2 id="add-your-details">Add your details</h2>
<ol><li>Select <strong>Edit card → Details · name, contact and links</strong>.</li><li>Enter your name, title, organization, pronouns, optional tagline, email and phone number as needed.</li><li>Use <strong>Add link</strong> to add a website or social link. Choose the link type and enter its address. The delete icon removes that link from the draft.</li><li>Tap <strong>Save</strong> and wait for it to finish. If saving fails, the editor displays an error so you can retry.</li></ol>
<p>If you go Back with unsaved details, choose <strong>Save changes</strong>, <strong>Keep editing</strong>, or <strong>Discard</strong>. Photo changes save separately; Discard does not undo a photo change.</p>
<p>To add a photo, use <strong>Pick</strong> in Details and complete the photo editor. <strong>Replace</strong> changes an existing photo; <strong>Remove</strong> clears it from the card. Some card styles hide photos, so check the selected style if your photo is not visible.</p>
<h2 id="use-several-cards">Use several cards</h2>
<p>Tap the current card name below the toolbar to open <strong>My cards</strong>.</p>
<ul><li>Select a card to make it active.</li><li><strong>New</strong> creates a blank card.</li><li><strong>Duplicate</strong> copies the selected card for a variation.</li><li><strong>Rename</strong> changes its label in the card list, rather than the name printed on the card.</li><li><strong>Design and layout</strong> opens the selected card&#x27;s design settings.</li><li><strong>Use selected card for widget</strong> chooses the card opened by the home-screen widget.</li></ul>
<p>Card labels must contain 1–40 characters. There is no card-delete control in this version.</p>
<h2 id="change-the-design">Change the design</h2>
<p>Open <strong>Edit card → Design · background and layout</strong>. Design changes save automatically; check for any error before leaving.</p>
<p><strong>App background</strong> changes the colour around all cards and editing screens. Choose a preset or <strong>Custom colour</strong>, tap a swatch or the spectrum, then <strong>Apply</strong>. <strong>Advanced · hex colour</strong> accepts six-digit hex values such as <code>#245A78</code>.</p>
<p><strong>Layout</strong> offers Portrait, Business, Classic, Photo left and Photo right. <strong>Choose accent colour</strong> changes the selected card&#x27;s accent. The interface adjusts accent contrast for readability, so button colours may differ from the exact card accent. <strong>More card styles</strong> reveals the available base styles.</p>
<p><strong>Background image</strong> accepts your artwork. Use a 16:9 image for predictable framing; other proportions are cropped to fit. Choose <strong>Dark text</strong> or <strong>Light text</strong> to suit the artwork. Turn on <strong>Readable details panel</strong> when text needs a solid background. Business layout has its own arrangement, so its controls differ from the other artwork layouts.</p>
<p>For Business layout, <strong>QR destination</strong> can point to <strong>Add to contacts</strong> or one of the card&#x27;s links. The separate <strong>Show contact QR</strong> sharing action continues to show contact details.</p>
<figure><a href="/assets/cardbuddy-guide-1.11-design.png" aria-label="Open full-size Design screenshot"><img src="/assets/cardbuddy-guide-1.11-design.png" alt="Design settings: background colours, layouts, artwork and accent colour" width="1220" height="2712" loading="lazy" /></a><figcaption>Design settings in CardBuddy 1.11. Tap the screenshot to view it full size.</figcaption></figure>
<h2 id="move-and-resize-artwork-elements">Move and resize artwork elements</h2>
<p>Placement editing is available when the card has a background image and uses a layout other than Business.</p>
<ol><li>Open <strong>Edit card → Placement · move details and QR</strong>.</li><li>Drag the details block or profile photo to move it independently.</li><li>Drag its bottom-right corner handle to resize the photo or details block.</li><li>Choose <strong>No QR</strong>, <strong>QR left</strong>, or <strong>QR right</strong>. Drag a visible QR to move it.</li><li>Tap <strong>Done</strong> when the arrangement looks right. Placement saves automatically.</li></ol>
<p>The QR has movable placement; the resize handles are for the photo and details block. Elements can overlap, so check the result before sharing. <strong>Reset</strong> in placement restores the element positions and sizes; it does not reset the full design.</p>
<h2 id="present-the-card">Present the card</h2>
<p>Tap <strong>Present</strong> to open the presentation view. Tap the card background to show or hide its controls. Use <strong>Share</strong> to share from this view, or <strong>Close</strong> to return.</p>
<h2 id="share-a-contact-qr-image-or-pdf">Share a contact QR, image or PDF</h2>
<p>Tap <strong>Share card</strong> on the main screen, or <strong>Share</strong> in presentation.</p>
<ul><li><strong>Show contact QR</strong> opens a large QR containing your contact details. Ask the recipient to scan it with their phone. Their scanner determines how the contact is imported.</li><li><strong>Share image</strong> prepares a PNG of the card.</li><li><strong>Share PDF</strong> prepares a PDF of the card.</li></ul>
<p>For image or PDF, inspect the preview, tap <strong>Share</strong>, then select an app or recipient in Android&#x27;s chooser. Only the card is exported, without the editor controls or surrounding app background. Available save destinations depend on the apps installed on your phone.</p>
<p>Tap <strong>Add to contacts ▾</strong> at the top of the enlarged QR view to switch between the contact QR and one of your additional links. The displayed QR updates to the selected destination. Use this large view when the card’s smaller QR is difficult to scan.</p>
<h2 id="open-a-card-from-a-home-screen-widget">Open a card from a home-screen widget</h2>
<ol><li>Select your preferred card in <strong>My cards</strong> and choose <strong>Use selected card for widget</strong>.</li><li>Open <strong>⋮ → Add home-screen widget</strong> and follow your launcher&#x27;s instructions.</li><li>Tap the widget to open that card directly in presentation.</li></ol>
<p>If your launcher does not support adding it from the app, long-press your home screen, choose <strong>Widgets</strong>, then find CardBuddy. Widget placement depends on your launcher.</p>
<h2 id="reset-the-styling">Reset the styling</h2>
<p>Open Design and tap <strong>Reset styling</strong>. Read and confirm the dialog.</p>
<p>This restores the selected card&#x27;s default style, layout, accent, element sizes and positions; removes its artwork reference; disables the readable details panel; and resets the global app background to black. Contact details, links and the profile photo are kept. Other cards keep their designs. This action does not delete the stored image files.</p>
<h2 id="storage-and-troubleshooting">Storage and troubleshooting</h2>
<p>Card details and imported images are stored on your device. This version has no in-app backup/restore or account sync. PNG/PDF exports are shareable copies, not backups that can be imported to restore editable cards. Keep a separate copy of your original details and images; recovery through Android backup has not been verified.</p>
<div className="guide-table"><table><thead><tr><th scope="col">Problem</th><th scope="col">Try this</th></tr></thead><tbody><tr><td>Details disappeared after editing</td><td>Tap Save and wait for completion; retry any save error. Check that the intended card is selected.</td></tr><tr><td>Placement option is absent</td><td>Add background artwork and choose a layout other than Business.</td></tr><tr><td>Photo is missing</td><td>Check that a photo is saved and that the selected style shows photos.</td></tr><tr><td>Text blends into artwork</td><td>Select Light/Dark text or enable Readable details panel.</td></tr><tr><td>Widget opens another card</td><td>Set the intended card using My cards → Use selected card for widget.</td></tr><tr><td>QR is hard to scan</td><td>Open Show contact QR or enlarge the selected link QR; avoid glare and ask the recipient to try again.</td></tr><tr><td>Export fails</td><td>Read the displayed error, check device storage and retry.</td></tr></tbody></table></div>
          <p className="guide-updated">Last updated 19 October 2026 · Guide for Android version 1.11, build 13.</p>
          <a href="#guide-content">Back to top ↑</a>
        </main>
      </div>
      <footer className="site-footer frame"><img src={logo} alt="PhaseLabs" /><p>Your business card, ready to share.</p></footer>
    </div>
  );
}
