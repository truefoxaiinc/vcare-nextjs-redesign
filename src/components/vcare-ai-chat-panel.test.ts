import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const component = readFileSync(resolve(process.cwd(), 'src/components/vcare-ai-chat-panel.tsx'), 'utf8');
const layout = readFileSync(resolve(process.cwd(), 'src/app/layout.tsx'), 'utf8');

describe('inactive AI chat panel integration boundaries', () => {
  it('is not mounted in the production layout', () => {
    expect(layout).not.toContain('VcareAiChatPanel');
    expect(layout).toContain('isLiveChatEnabled() ? <VcareAiChatLauncher/> : <VcareChatWidget/>');
  });

  it('requires explicit consent before creating a session', () => {
    expect(component).toContain("status !== 'consent'");
    expect(component).toContain('await active.start(true)');
    expect(component).toContain('I understand — start AI chat');
  });

  it('discloses the AI provider and handles deletion uncertainty', () => {
    expect(component).toContain('configured AI model provider');
    expect(component).toContain('End chat and request deletion');
    expect(component).toContain('could not confirm server-side deletion');
  });

  it('renders conversation content as React text, not injected HTML', () => {
    expect(component).not.toContain('dangerouslySetInnerHTML');
    expect(component).toContain('{message.text}');
  });
  it('preserves failed messages for retry without duplicate optimistic bubbles', () => {
    expect(component).toContain('const messageId = nextId.current');
    expect(component).toContain('current.filter((message) => message.id !== messageId)');
    expect(component).toContain('setDraft((current) => current || text)');
    expect(component).toContain('Your message is ready to retry');
    expect(component).toContain('if (controller.current === active)');
  });

  it('blocks rapid repeated consent clicks before React state commits', () => {
    expect(component).toContain("status !== 'consent' || controller.current !== null");
    expect(component).toContain('controller.current = active');
    expect(component.indexOf('controller.current = active')).toBeLessThan(component.indexOf('await active.start(true)'));
    expect(component).toContain('controller.current = null');
  });

});
