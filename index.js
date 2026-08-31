require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ==========================================
// CONFIGURATION
// ==========================================

// MAP YOUR ROLE IDs TO PREFIXES
const ROLE_PREFIXES = {
    'YOUR_OWNER_ROLE_ID_HERE': '﹒〔OWN〕#',   // owner
    'YOUR_CO_OWNER_ROLE_ID_HERE': '﹒〔C-OWN〕#', // c-owner
    'YOUR_ADMIN_ROLE_ID_HERE': '﹒〔ADM〕#',   // admin
    'YOUR_FOUNDER_ROLE_ID_HERE': '﹒〔FND〕#'    // founder
};

// Hierarchy order (highest priority first)
const ROLE_ORDER = [
    'YOUR_OWNER_ROLE_ID_HERE',
    'YOUR_CO_OWNER_ROLE_ID_HERE',
    'YOUR_ADMIN_ROLE_ID_HERE',
    'YOUR_FOUNDER_ROLE_ID_HERE'
];

// QOTD / Auto-Thread Channel ID
const QOTD_CHANNEL_ID = 'YOUR_QOTD_CHANNEL_ID_HERE';

// Reaction emojis for the QOTD post
const QOTD_REACTIONS = ['👍', '👎'];

// ==========================================
// BOT READY & PRESENCE ROTATION
// ==========================================

client.once('ready', () => {
    console.log(`[ONLINE] Logged in as ${client.user.tag}`);
    
    const PRESENCES = ['.gg/moonwalker', 'heehee', "you're a vegetable!", "who's bad??!"];
    let presIndex = 0;

    setInterval(() => {
        try {
            client.user.setPresence({
                activities: [{ name: PRESENCES[presIndex], type: ActivityType.Playing }],
                status: 'online'
            });
        } catch (err) {
            console.error('[PRESENCE ERROR]', err);
        }
        
        presIndex = (presIndex + 1) % PRESENCES.length;
    }, 10000);
});

// ==========================================
// FEATURE 1: NICKNAME ROLE MANAGEMENT
// ==========================================

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const oldRoleIds = oldMember.roles.cache.map(r => r.id);
    const newRoleIds = newMember.roles.cache.map(r => r.id);
    
    const rolesChanged = oldRoleIds.length !== newRoleIds.length || 
                         !oldRoleIds.every(id => newRoleIds.includes(id));

    if (!rolesChanged) return;

    let highestMatchingRoleId = null;
    for (const roleId of ROLE_ORDER) {
        if (newMember.roles.cache.has(roleId)) {
            highestMatchingRoleId = roleId;
            break;
        }
    }

    let currentName = newMember.nickname || newMember.user.displayName || newMember.user.username;
    const cleanName = currentName.replace(/^﹒〔[^〕]+〕#\s*/, '');

    let formattedNick = null;

    if (highestMatchingRoleId) {
        // CASE 1: Member has a configured role -> Apply/Update prefix
        const prefix = ROLE_PREFIXES[highestMatchingRoleId];
        formattedNick = `${prefix} ${cleanName}`.slice(0, 32);
    } else {
        // CASE 2: Member lost all configured roles -> Remove prefix
        if (newMember.nickname && newMember.nickname.startsWith('﹒〔')) {
            formattedNick = cleanName;
        }
    }

    if (formattedNick !== null && formattedNick !== newMember.nickname) {
        try {
            await newMember.setNickname(formattedNick);
            console.log(`[NICKNAME SUCCESS] Updated ${newMember.user.tag} -> "${formattedNick}"`);
        } catch (err) {
            console.error(`[NICKNAME ERROR] Failed to set nickname for ${newMember.user.tag}: ${err.message}`);
        }
    }
});

// ==========================================
// FEATURE 2: AUTOMATIC QOTD REACTION & THREAD CREATOR
// ==========================================

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.id !== QOTD_CHANNEL_ID) return;

    const contentLower = message.content.toLowerCase();
    const isQotd = contentLower.includes('question of the day') || 
                   contentLower.includes('qotd') || 
                   message.content.includes('❓');

    if (isQotd) {
        try {
            // Add reaction emojis to the main QOTD message
            for (const emoji of QOTD_REACTIONS) {
                await message.react(emoji);
            }

            // Create discussion thread attached to the message
            const thread = await message.startThread({
                name: `💬 QOTD Answers - ${new Date().toLocaleDateString()}`,
                autoArchiveDuration: 1440,
                reason: 'Automated QOTD Discussion Thread'
            });

            await thread.send(`Drop your answers to today's question below! 👇`);
            console.log(`[QOTD SUCCESS] Added reactions & thread for message in #${message.channel.name}`);
        } catch (err) {
            console.error(`[QOTD ERROR] Failed to react or create thread: ${err.message}`);
        }
    }
});

// ==========================================
// BOT LOGIN
// ==========================================

const token = process.env.DISCORD_TOKEN || process.env.BOT_TOKEN;

if (!token) {
    console.error('[FATAL ERROR] No bot token found in environment variables!');
    process.exit(1);
}

client.login(token);require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ==========================================
// CONFIGURATION
// ==========================================

// MAP YOUR ROLE IDs TO PREFIXES
const ROLE_PREFIXES = {
    'YOUR_ROLE_ID_HERE': 'custom name',   // own
};

// Hierarchy order (highest priority first)
const ROLE_ORDER = [
    'YOUR_ROLE_ID_HERE',

];

// QOTD / Auto-Thread Channel ID
const QOTD_CHANNEL_ID = 'YOUR_QOTD_CHANNEL_ID_HERE';

// Reaction emojis for the QOTD post
const QOTD_REACTIONS = ['👍', '👎'];

// ==========================================
// BOT READY & PRESENCE ROTATION
// ==========================================

client.once('ready', () => {
    console.log(`[ONLINE] Logged in as ${client.user.tag}`);
    
    const PRESENCES = ['.gg/moonwalker', 'heehee', "you're a vegetable!", "who's bad??!"];
    let presIndex = 0;

    setInterval(() => {
        try {
            client.user.setPresence({
                activities: [{ name: PRESENCES[presIndex], type: ActivityType.Playing }],
                status: 'online'
            });
        } catch (err) {
            console.error('[PRESENCE ERROR]', err);
        }
        
        presIndex = (presIndex + 1) % PRESENCES.length;
    }, 10000);
});

// ==========================================
// FEATURE 1: NICKNAME ROLE MANAGEMENT
// ==========================================

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const oldRoleIds = oldMember.roles.cache.map(r => r.id);
    const newRoleIds = newMember.roles.cache.map(r => r.id);
    
    const rolesChanged = oldRoleIds.length !== newRoleIds.length || 
                         !oldRoleIds.every(id => newRoleIds.includes(id));

    if (!rolesChanged) return;

    let highestMatchingRoleId = null;
    for (const roleId of ROLE_ORDER) {
        if (newMember.roles.cache.has(roleId)) {
            highestMatchingRoleId = roleId;
            break;
        }
    }

    let currentName = newMember.nickname || newMember.user.displayName || newMember.user.username;
    const cleanName = currentName.replace(/^﹒〔[^〕]+〕#\s*/, '');

    let formattedNick = null;

    if (highestMatchingRoleId) {
        // CASE 1: Member has a configured role -> Apply/Update prefix
        const prefix = ROLE_PREFIXES[highestMatchingRoleId];
        formattedNick = `${prefix} ${cleanName}`.slice(0, 32);
    } else {
        // CASE 2: Member lost all configured roles -> Remove prefix
        if (newMember.nickname && newMember.nickname.startsWith('﹒〔')) {
            formattedNick = cleanName;
        }
    }

    if (formattedNick !== null && formattedNick !== newMember.nickname) {
        try {
            await newMember.setNickname(formattedNick);
            console.log(`[NICKNAME SUCCESS] Updated ${newMember.user.tag} -> "${formattedNick}"`);
        } catch (err) {
            console.error(`[NICKNAME ERROR] Failed to set nickname for ${newMember.user.tag}: ${err.message}`);
        }
    }
});

// ==========================================
// FEATURE 2: AUTOMATIC QOTD REACTION & THREAD CREATOR
// ==========================================

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.id !== QOTD_CHANNEL_ID) return;

    const contentLower = message.content.toLowerCase();
    const isQotd = contentLower.includes('question of the day') || 
                   contentLower.includes('qotd') || 
                   message.content.includes('❓');

    if (isQotd) {
        try {
            // Add reaction emojis to the main QOTD message
            for (const emoji of QOTD_REACTIONS) {
                await message.react(emoji);
            }

            // Create discussion thread attached to the message
            const thread = await message.startThread({
                name: `💬 QOTD Answers - ${new Date().toLocaleDateString()}`,
                autoArchiveDuration: 1440,
                reason: 'Automated QOTD Discussion Thread'
            });

            await thread.send(`Drop your answers to today's question below! 👇`);
            console.log(`[QOTD SUCCESS] Added reactions & thread for message in #${message.channel.name}`);
        } catch (err) {
            console.error(`[QOTD ERROR] Failed to react or create thread: ${err.message}`);
        }
    }
});

// ==========================================
// BOT LOGIN
// ==========================================

const token = process.env.DISCORD_TOKEN || process.env.BOT_TOKEN;

if (!token) {
    console.error('[FATAL ERROR] No bot token found in environment variables!');
    process.exit(1);
}

client.login(token);