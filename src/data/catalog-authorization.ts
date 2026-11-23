/**
 * Client-reported permission recorded from the project instruction received
 * on 2026-10-19. This is not supplier-issued licensing evidence.
 */
export const clientReportedAuthorization = {
  imageAuthorizationStatus: 'approved' as const,
  imageAuthorizedBy: 'Vcare client (reported)',
  imageAuthorizedAt: '2026-10-19',
  imageAuthorizationReference: 'Client-reported permission in project instruction dated 2026-10-19',
  descriptionAuthorizationStatus: 'approved' as const,
  descriptionAuthorizedBy: 'Vcare client (reported)',
  descriptionAuthorizedAt: '2026-10-19',
  descriptionAuthorizationReference: 'Client-reported permission in project instruction dated 2026-10-19'
} as const;

/** Client-reported permission recorded from the Vidar product display request on 2026-11-23. */
export const vidarProductDisplayAuthorization = {
  imageAuthorizationStatus: 'approved' as const,
  imageAuthorizedBy: 'Vcare client (reported)',
  imageAuthorizedAt: '2026-11-23',
  imageAuthorizationReference: 'Client-reported instruction to display Vidar products and supplier images dated 2026-11-23',
  descriptionAuthorizationStatus: 'approved' as const,
  descriptionAuthorizedBy: 'Vcare client (reported)',
  descriptionAuthorizedAt: '2026-11-23',
  descriptionAuthorizationReference: 'Client-reported instruction to display Vidar products and supplier descriptions dated 2026-11-23'
} as const;
