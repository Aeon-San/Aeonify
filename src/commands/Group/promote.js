import { requireGroupPermissions } from "../../utils/groupChecks.js";
import { extractTargetUserUniversal } from "../../utils/target.js";
import config from "../../config.js";

const promoteCommand = {
  name: "promote",
  aliases: ["admin", "makeadmin"],
  description: "Promote member to admin",
  usage: "!promote @user/reply/number",
  cooldown: 5000,

  run: async (ctx) => {
    const { Aeonify, jid, messages: m, groupMetadata, checkPermissions, args, message } = ctx;
    const { targetJid } = extractTargetUserUniversal({ m, args, message });
    const targetParticipant = targetJid && groupMetadata?.participants?.find(p => p.id === targetJid);
    if (!(await requireGroupPermissions({ ...ctx, targetUser: targetJid, targetParticipant }, { admin: true, botAdmin: true, target: true }))) return;

    const hasPermission = await checkPermissions(targetJid);
    if (!hasPermission) return;

    await Aeonify.sendMessage(jid, { react: { text: "🫡", key: m.key }});

    await Aeonify.groupParticipantsUpdate(jid, [targetJid], "promote")
      .then(async () => {
        const targetName = targetParticipant?.name || targetJid.split('@')[0];
        await Aeonify.sendMessage(jid, { 
          text: `📈 *Promoted Successfully!*\n👤 @${targetJid.split('@')[0]}\n🎉 Welcome to admin team!`,
          mentions: [targetJid]
        });
      })
      .catch(async (err) => {
        console.error('Promote error:', err);
        await Aeonify.sendMessage(jid, { text: "*Failed to promote user!* Please try again later." });
      });
  }
};

export default promoteCommand;